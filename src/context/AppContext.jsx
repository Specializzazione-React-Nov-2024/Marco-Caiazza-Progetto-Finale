import { createContext } from "react";

const AppContext = createContext({
    loading:false,
    setLoading: () => {},

    error:'',
    setError: () => {},

    movies: [],
    setMovies: () => {},

    initialMoviesLoaded:false,
    setInitialMoviesLoaded: () => {},
    
});

export default AppContext;