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

                const cachedMovies = localStorage.getItem("movies");

                if (cachedMovies) {
                    const movies = JSON.parse(cachedMovies);
                    const movie = movies.find(
                        (movie) => movie.imdbID === movieId
                    );
                    if (movie) {
                        setMovieDetails(movie);
                        setLoading(false);
                    } else {
                        const response = await axios.get(
                            `http://www.omdbapi.com/?apikey=${
                                import.meta.env.VITE_API_KEY
                            }&i=${movieId}`
                        );
                        const movieData = response.data;
                        setMovieDetails(movieData);
                        localStorage.setItem(
                            "movies",
                            JSON.stringify([...movies, movieData])
                        );
                        setLoading(false);
                    }
                } else {
                    const response = await axios.get(
                        `http://www.omdbapi.com/?apikey=${
                            import.meta.env.VITE_API_KEY
                        }&i=${movieId}`
                    );
                    const movieData = response.data;
                    setMovieDetails(movieData);
                    localStorage.setItem("movies", JSON.stringify([movieData]));
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
