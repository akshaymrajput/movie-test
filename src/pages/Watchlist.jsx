import React, { useContext } from "react";
import MovieCard from "../components/MovieCard";
import "./Watchlist.css";

import GlobalContext, { ActionTypes } from "../contexts/GlobalContext";

const Watchlist = () => {
    const { userId, watchlists, dispatch } = useContext(GlobalContext);

    const handleDeleteFromWatchlist = (movieId) => {
        dispatch({
            type: ActionTypes.DELETE_MOVIE_FROM_WATCHLIST,
            payload: { userId, movieId },
        });
    };

    return (
        <div className="watchlist">
            <h1 className="watchlist__heading">
                My Watchlist: (Total Movies: {watchlists?.length})
            </h1>
            {watchlists && watchlists.length > 0 && (
                <div className="watchlist__movies">
                    {watchlists.map((movie) => (
                        <MovieCard
                            movie={movie}
                            isInWatchlist={true}
                            key={movie.imdbID}
                            onDeleteFromWatchlist={() =>
                                handleDeleteFromWatchlist(movie.imdbID)
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
