import React, { useContext } from "react";
import {
  Navbar,
  Form,
  InputGroup,
  FormControl,
  Button,
  Container,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router";
import styles from "./NavbarUI.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import Loading from "../Loading";
import AutoCompleteCard from "../AutoCompleteMovie";
import SessionContext from "../../context/SessionContext";
import Dropdown from "react-bootstrap/Dropdown";
import supabase from "../../supabase/client";
import UseProfile from "../../hooks/useProfile";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavbarUI() {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [autoCompleteMovies, setAutoCompleteMovies] = useState([]);
  const { username } = UseProfile();

  const {
    loading,
    setLoading,
    movies,
    setMovies,
    initialMoviesLoaded,
    setInitialMoviesLoaded,
  } = useContext(AppContext);

  const session = useContext(SessionContext);
  console.log("sessione:", session);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    }
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClickOverlay = () => {
    setSearch("");
    setFocus(false);
    setMovies([]);
  };

  useEffect(() => {
    if (!initialMoviesLoaded) return;

    const timeOut = setTimeout(() => {
      async function getSearchMovie() {
        if (!search) {
        }
        const url = `${import.meta.env.VITE_API_BASE_URL}search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${encodeURIComponent(search)}`;
        try {
          const response = await fetch(url);
          const json = await response.json();
          const filteredMovies = json.results.filter((movie) =>
            movie.title.toLowerCase().startsWith(search.toLowerCase())
          );
          setAutoCompleteMovies(filteredMovies || []);
        } catch (error) {
          setError("Errore nel caricamento", error.message);
        }
      }
      getSearchMovie();
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search]);

  return (
    <>
      <Navbar expand="lg" className={styles.navbar}>
        <Container className={styles.containerCustom}>
          <Link to="/" className={styles.linkBestmovies}>
            <h3>
              <strong>BestMovies</strong>
            </h3>
          </Link>
          <Form className="container-fluid" onSubmit={handleSubmit}>
            <InputGroup className={styles.inputGroupCustom}>
              <FormControl
                className={styles.inputCustom}
                type="text"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={search}
                onFocus={handleFocus}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="outline-secondary"
                className={styles.inputBtn}
                id="search-addon"
              >
                <img src="/search.png" alt="search-img" />
              </Button>
            </InputGroup>
          </Form>
          {!session ? (
            <div className={styles.containerBtn}>
              <Link to="/login">
                <Button className={styles.btnUser}>Login</Button>
              </Link>
              <Link to="/signUp">
                <Button className={styles.btnUser}>SignUp</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.containerBtnProfile}>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={
                  <span className={styles.customDropdownTitle}>
                    <strong>{username}</strong>
                  </span>
                }
                menuVariant={styles.menu}
                className={styles.navbarDropdown}
              >
                <NavDropdown.Item as={Link} to={`/profile`}>
                  <strong>Profile</strong>
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to={`/settings`}>
                  <strong>Account</strong>
                </NavDropdown.Item>

                <NavDropdown.Item onClick={signOut}>
                  <strong>Logout</strong>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </Container>
        {loading && <Loading />}
        {focus && search && search.length > 0 && (
          <div className={styles.autoCompleteContainer}>
            {autoCompleteMovies.map((movie) => (
              <AutoCompleteCard
                key={movie.id}
                movie={movie}
                search={search}
                handleClickOverlay={handleClickOverlay}
              />
            ))}
          </div>
        )}
      </Navbar>
    </>
  );
}
