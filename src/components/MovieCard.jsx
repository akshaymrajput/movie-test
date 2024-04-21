import React, { useContext } from "react";
import { Tooltip } from "react-tooltip";
import "./MovieCard.css";
import {
    BsFillBookmarkPlusFill,
    BsBookmarkXFill,
    BsArrowUpRightSquareFill,
} from "react-icons/bs";
import GlobalContext, { ActionTypes } from "../contexts/GlobalContext";
import Notification from "./Notification";
import useNotification from "../hooks/useNotification";
import { NavLink } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const { dispatch, userId, watchlists } = useContext(GlobalContext);
    const { notification, showNotification } = useNotification();

    const movieObj = movie;

    const isInWatchlist =
        watchlists && watchlists.some((item) => item.imdbID === movie.imdbID);

    const handleAddToWatchlist = () => {
        if (!isInWatchlist) {
            dispatch({
                type: ActionTypes.ADD_MOVIE_TO_WATCHLIST,
                payload: { userId, movie },
            });
            showNotification(`${movie.Title} Successfully Added!`);
        }
    };

    const handleRemoveFromWatchlist = () => {
        dispatch({
            type: ActionTypes.DELETE_MOVIE_FROM_WATCHLIST,
            payload: { userId, movieId: movie.imdbID },
        });
        showNotification(`${movie.Title} Removed from Watchlist`);
    };

    return (
        <div className="card">
            <div className="card__img">
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="card__info">
                <h3 className="card__title">{movie.Title}</h3>
                <p className="card__year">
                    <strong>Year:</strong> {movie.Year}
                </p>
                <p className="card__type">
                    <strong>Type:</strong> {movie.Type}
                </p>
            </div>
            {isInWatchlist ? (
                <button
                    className="card__remove-from-watchlist"
                    onClick={handleRemoveFromWatchlist}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Remove from Watchlist"
                >
                    <BsBookmarkXFill />
                </button>
            ) : (
                <button
                    className="card__add-to-watchlist"
                    onClick={handleAddToWatchlist}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Add to Watchlist"
                >
                    <BsFillBookmarkPlusFill />
                </button>
            )}
            <NavLink
                to={{
                    pathname: `/movies/${movie.imdbID}`,
                }}
                state={{ movie: movieObj }}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Movie Details"
            >
                <BsArrowUpRightSquareFill />
            </NavLink>
            <Tooltip style={{ zIndex: 400 }} id="my-tooltip" />
            {notification.showMessage && (
                <Notification message={notification.message} />
            )}
        </div>
    );
};

export default MovieCard;
