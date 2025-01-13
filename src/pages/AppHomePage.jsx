import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import Loading from "../components/Loading";
import MoviesUI from "../components/MoviesUI";
import SidebarUI from "../components/SidebarUI";
import { Button } from "react-bootstrap";
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";

export default function AppHomePage() {
  const {
    loading,
    setLoading,
    error,
    setError,
    initialMoviesLoaded,
    setInitialMoviesLoaded,
  } = useContext(AppContext);

  const [search, setSearch] = useState("");

  const GoUpScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SCROLL

  let movies = useAsyncList({
    async load({ signal, cursor }) {
      let url = `${import.meta.env.VITE_API_BASE_URL}movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${cursor || 1}`;
      try {
        let res = await fetch(url, { signal });
        let json = await res.json();
        setInitialMoviesLoaded(true);
        return {
          items: json.results,
          cursor: json.page < json.total_pages ? json.page + 1 : null,
        };
      } catch (err) {
        console.error("Error loading movies", err);
        return {
          items: [],
          cursor: null,
        };
      }
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (movies.items.length && inView && !movies.isLoading) {
      movies.loadMore();
    }
  }, [inView]);

  return (
    <>
      <div className="containerHome">
        <div className="containerCard">
          <SidebarUI />
          <div className="containerMovies">
            <h1>POPULAR FILMS</h1>
            <div className="row">
              <div className="col-12">
                {movies.items && movies.items.length > 0 ? (
                  movies.items.map((movie, index) => (
                    <MoviesUI key={movie.id} movie={movie} index={index} />
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="containerBtnUp">
            <Button className="goUp" onClick={GoUpScroll}>
              <img src="/Up.png" alt="btn-Up" />
              <p>Go Up</p>
            </Button>
          </div>
        </div>
        <div ref={ref}>
          <Loading />
        </div>
      </div>
    </>
  );
}
