import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./SidebarUI.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";

export default function SidebarUI() {
  const { movies, setMovies, error, setError } = useContext(AppContext);

  useEffect(() => {
    async function fetchPageMovie() {
      let url = `${import.meta.env.VITE_API_BASE_URL}movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=1`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMovies(json.results);
      } catch (error) {
        setError("Errore nel caricamento: ", error.message);
      }
    }
    fetchPageMovie();
  }, []);

  return (
    <div className={styles.containerSidebar}>
      <Nav>
        <NavDropdown
          id="nav-dropdown-dark-example"
          title={
            <span className={styles.customDropdownTitle}>
              <strong>Filter A-Z</strong>
            </span>
          }
          menuVariant={styles.menu}
          className={styles.sidebarDropdown}
        >
          <NavDropdown.Item as={Link} to={`/`}>
            <strong>Popular Film</strong>
          </NavDropdown.Item>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <NavDropdown.Item as={Link} to={`/movies/${letter}`} key={letter}>
              <strong>{letter}</strong>
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
    </div>
  );
}
