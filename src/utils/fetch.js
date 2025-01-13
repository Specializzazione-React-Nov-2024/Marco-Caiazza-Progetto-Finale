    export async function getMovieId({ params }) {

      let url = `${import.meta.env.VITE_API_BASE_URL}movie/${params.id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`;
        const response = await fetch(url);
        const json = await response.json();
        // setMovieId(json);
        
        const imageUrl = json.backdrop_path
        ? `https://image.tmdb.org/t/p/original${json.backdrop_path}`
        : "";
        
        return json;
      
    }