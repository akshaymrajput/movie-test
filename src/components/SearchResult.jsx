import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import "./SearchResult.css";
import GlobalContext from "../contexts/GlobalContext";

const SearchResult = ({ movies }) => {
    const { watchlists } = useContext(GlobalContext);

    const isMovieInWatchlist = (movieId) => {
        const userWatchlists = watchlists || [];

        console.log("userWatchlists", userWatchlists);

        return userWatchlists?.some((movie) => movie.imdbID === movieId);
    };

    return (
        <div className="results">
            {movies?.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isInWatchlist={isMovieInWatchlist(movie.imdbID)}
                />
            ))}
        </div>
    );
};

export default SearchResult;
