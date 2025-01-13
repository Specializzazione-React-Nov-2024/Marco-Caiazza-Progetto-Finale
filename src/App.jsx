import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import { useState } from "react";
import "./App.css";
import AppContext from "./context/AppContext";
import SessionContextProvider from "./context/SessionContextProvider";


function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [initialMoviesLoaded, setInitialMoviesLoaded] = useState(false);

  return (
    <div className="container">
      <AppContext.Provider
        value={{
          loading,
          setLoading,
          error,
          setError,
          movies,
          setMovies,
          initialMoviesLoaded,
          setInitialMoviesLoaded,
        }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );
}

function Root() {
  return (
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  ) 
}

export default Root;
