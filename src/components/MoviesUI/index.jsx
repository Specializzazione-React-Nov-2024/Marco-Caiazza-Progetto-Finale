import styles from "./MoviesUI.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function MoviesUI({ movie, index }) {
  const { title, poster_path, id } = movie;
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const backgroundImg = new Image();
    backgroundImg.src = "./movie-background.jpg";

    backgroundImg.onload = () => {
      setBackgroundLoaded(true);
    };
  }, []);

  const animatDirection = index % 2 === 0 ? "from-right" : "from-left";

  return (
    <div
      className={`${styles.container} ${styles[animatDirection]} ${styles.show}`}
    >
      <div className="row">
        <div className={styles.containerMovie}>
          <div className={styles.titleWrapper}>
            <Link to={{ pathname: `/movie/${title}/${id}`, state: { movie } }}>
              <h3 className={styles.title}>{title}</h3>
            </Link>
          </div>
          <div className={styles.titleWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt="Poster Film"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
