import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import styles from "../pages/AppMovie.module.css";
import SessionContext from "../context/SessionContext";
import "bootstrap/dist/css/bootstrap.min.css";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import RealtimeChatUI from "../components/RealtimeChatUI";
import { Link } from "react-router";


export default function AppMovie() {
  const session = useContext(SessionContext);

  const [fav, setFav] = useState([]);

  const { id } = useParams();
  const [movieId, setMovieId] = useState([]);
  const {
    release_date,
    runtime,
    vote_average,
    popularity,
    title,
    overview,
    homepage,
  } = movieId;
  const { loading, setLoading, error, setError } = useContext(AppContext);
  const [backgroundImage, setbackgroundImage] = useState("");
  const [loadedImage, setLoadedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // LEGGE FILM
  async function readFav(movieId) {
    if (!movieId || !movieId.id) {
      console.error("movieId is undefined or does not have an 'id' property");
      return;
    }

    let { data: Favourites, error } = await supabase
      .from("Favourites")
      .select(`*`)
      .eq("profile_id", session.user.id)
      .eq("movie_id", movieId.id);

      if (error) {
        console.log(error)
      }
      setFav(Favourites)

  }

// AGGIUNGE FILM
  async function insertIntoFav(movieId) {
    const { data, error } = await supabase
      .from("Favourites")
      .insert([
        {
          profile_id: session.user.id,
          movie_id: movieId.id,
          movie_name: movieId.title,
        },
      ])
      .select();

    if (error) {
      toast.error("Insert Failed");
    } else {
      toast.success("Insert Success!",{
        duration: 5000,
      });
      await readFav(movieId)
      // setFav((prevFav) => [...prevFav, ...data])
    }
  }

// FETCH DEI DATI
  useEffect(() => {
    async function getMovieId() {
      setLoading(true);
      let url = `${import.meta.env.VITE_API_BASE_URL}movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMovieId(json);

        const imageUrl = json.backdrop_path
          ? `https://image.tmdb.org/t/p/original${json.backdrop_path}`
          : "";

        setbackgroundImage(imageUrl);
      } catch (error) {
        setError("Errore nel caricamento", error.message);
      }
      setLoading(false);
    }

    async function loadMovieData() {
      await getMovieId();
      if (session && movieId.id && movieId.id) {
        await readFav(movieId);
      }

    }

    loadMovieData();
  }, [id]);



// IMMAGINE SFONDO
  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;

      img.onload = () => {
        setLoadedImage(backgroundImage);
      };
    }
  }, [backgroundImage]);

  useEffect(() => {
    if (movieId && movieId.id && session) {
      readFav(movieId);
    }
  }, [movieId, session]);

// RIMUOVE FILM
  async function removeFromFav(movieId) {
    const { data, error } = await supabase
      .from("Favourites")
      .delete()
      .eq("profile_id", session.user.id)
      .eq("movie_id", movieId.id);
  
    if (error) {
      toast.error("Remove Failed");
    } else {
      toast.success("Remove Success!");
      await readFav(movieId);
    }
  }
  

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));

    if (typeof message === 'string' && message.trim().length !== 0) {
          
    const { data, error } = await supabase
    .from('Messages')
    .insert([
      { profile_id: session.user.id, profile_username: session.user.user_metadata.username, movie_id: movieId.id, content: message },
    ])
    .select()
    if (error) {
      toast.error("message Failed");
    } else {
      toast.success("Message Sent!")
      inputMessage.reset();
    }

        }
      }


  return (
    <>
      <div
        className={styles.fullScreenBackground}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
            linear-gradient(to left, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)),
            url(${loadedImage})`,
        }}
      />
      <div className={styles.containerAll}>
        <div className="row p-4">
          <div className={`col ${styles.colInfo}`}>
            <div className={styles.containerTitle}>
              {title ? <h3>{title.toUpperCase()}</h3> : "Title not found"}
            </div>

            {/* RATINGS */}

            <div className={styles.containerRatings}>
              <div className={styles.year}>
                <img src="/calendario.png" alt="Release Data" />
                <div>
                  {release_date ? <p>{release_date.slice(0, 4)}</p> : <p>0</p>}
                </div>
              </div>

              <div className={styles.runtime}>
                <img src="/runtime.png" alt="Runtime" />
                <div>{runtime ? <p>{runtime}</p> : <p>0</p>}</div>
              </div>

              <div className={styles.vote}>
                <img src="/star.png" alt="Vote-average" />
                <div>{vote_average ? <p>{vote_average}</p> : <p>0</p>}</div>
              </div>

              <div className={styles.popularity}>
                <img src="/eye.png" alt="Popularity" />
                <div>
                  {popularity ? (
                    <p>
                      {isNaN(popularity)
                        ? "Invalid number"
                        : Math.trunc(popularity)}
                    </p>
                  ) : (
                    <p>0</p>
                  )}
                </div>
              </div>
            </div>

            {/* TRAMA */}

            <div className={styles.containerOverview}>
              {overview ? <p>{overview}</p> : <p>"Overview not found..."</p>}
            </div>

            {/* OFFICIAL SITE */}

            <div className={styles.officialSite}>
              {homepage ? (
                <button>
                  <img src="/officialSite.png" alt="Site" />
                  <a href={homepage} target="_blank">
                    Official Site
                  </a>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col p-2 d-flex justify-content-end">
            <div className={styles.btnGoBack}>
          <Link to="/" className={styles.linkBestmovies}>
              <button >
              <img src="/indietro.png" alt="Go back" />
              </button>
          </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            {/* BOTTONI */}
            {session &&  (
              <div className={styles.btnFavourite}>
                {fav.length == 0 ?
                <div className={styles.btnToFav}>
                  <button onClick={() => insertIntoFav(movieId)}>
                    <img src="/addFav.png" alt="Add Favourite" />
                    My List
                  </button>
                  <Toaster richColors />
                </div>
                :
                <div className={styles.btnToRemoveFav}>
                  <button onClick={() => removeFromFav(movieId)}>
                    <img src="/removeFav.png" alt="Remove Favourite" />
                    My List
                  </button>
                </div>}

              </div>        
            )}
          </div>

          <div className="col d-flex justify-content-center">
          <RealtimeChatUI movieId={movieId} session={session} handleMessageSubmit={handleMessageSubmit} />
          <Toaster richColors />
          </div>
        </div>
      </div>
    </>
  );
}
