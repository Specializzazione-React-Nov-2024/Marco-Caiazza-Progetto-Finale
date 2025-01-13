import AppContext from "../context/AppContext";
import { useParams } from "react-router";
import { useContext } from "react";
import SidebarUI from "../components/SidebarUI";
import MoviesUI from "../components/MoviesUI";
import Loading from "../components/Loading";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppMoviesLetter() {
  const { movies, loading } = useContext(AppContext);
  const { letter } = useParams();

  if (!movies) {
    return [];
  }
  const filteredMovies = movies.filter((movie) => {
    if (!movie.title) {
      return false;
    }
    const firstLetter = letter.toUpperCase();
    return movie.title.startsWith(firstLetter);
  });

  const GoUpScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="containerHome">
      <SidebarUI />
      {loading && <Loading />}
      <div className="containerFilteredMovies">
        {filteredMovies && filteredMovies.length > 0 && (
          <div className="titleLetter">
            <h1>Movies found with the letter " {letter} "</h1>
          </div>
        )}
        <div className="row">
          <div className="col-12">
            {filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <MoviesUI key={movie.id} movie={movie} index={index} />
              ))
            ) : (
              <div className="containerMoviesNotFound">
                <h1>No matches found...</h1>
                <img src="/film.png" alt="Film not found" />
              </div>
            )}
            {filteredMovies.length > 2 ? (
              <div className="containerBtnUp">
                <Button className="goUp" onClick={GoUpScroll}>
                  <img src="/Up.png" alt="btn-Up" />
                  <p>Go Up</p>
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
