import { useEffect, useState } from "react";
import axios from "axios";

const useMovieDetails = (movieId) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                let cachedMovies = localStorage.getItem("movies");
                cachedMovies = cachedMovies ? JSON.parse(cachedMovies) : [];

                const cachedMovie = cachedMovies.find(
                    (movie) => movie.imdbID === movieId
                );

                if (cachedMovie) {
                    setMovieDetails(cachedMovie);
                    setLoading(false);
                } else {
                    const response = await axios.get(
                        `https://www.omdbapi.com/?apikey=${
                            import.meta.env.VITE_API_KEY
                        }&i=${movieId}`
                    );
                    const movieData = response.data;
                    setMovieDetails(movieData);
                    localStorage.setItem(
                        "movies",
                        JSON.stringify([...cachedMovies, movieData])
                    );
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    return { movieDetails, loading, error };
};

export default useMovieDetails;
