import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AutoCompleteMovie.module.css";
import { Link } from "react-router";

export default function AutoCompleteCard({ movie, handleClickOverlay }) {
  const { poster_path, backdrop_path, title, id } = movie;

  return (
    <>
      {poster_path && (
        <div className={styles.containerCardSuggestions}>
          <article className={styles.cardSuggestions}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={"image-suggestion"}
            />
            <Link to={`/movie/${title}/${id}`} onClick={handleClickOverlay}>
              <p>{title}</p>
            </Link>
          </article>
        </div>
      )}
    </>
  );
}
