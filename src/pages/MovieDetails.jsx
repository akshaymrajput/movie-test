import React, { useContext } from "react";
import "./MovieDetails.css";
import { useLocation, useParams } from "react-router-dom";
import { SiRottentomatoes } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import GlobalContext, { ActionTypes } from "../contexts/GlobalContext";
import useNotification from "../hooks/useNotification";
import Notification from "../components/Notification";
import useMovieDetails from "../hooks/useMovieDetails";
import Loader from "../components/Loader";

const MovieDetails = () => {
    const params = useParams();
    const location = useLocation();
    const movieId = params.movieId;

    const movie = location.state?.movie;

    const { movieDetails, loading, error } = useMovieDetails(movieId);

    const { dispatch, userId, watchlists } = useContext(GlobalContext);
    const { notification, showNotification } = useNotification();

    const isInWatchlist =
        watchlists && watchlists.some((item) => item.imdbID === movieId);

    const handleAddToWatchlist = () => {
        if (!isInWatchlist) {
            dispatch({
                type: ActionTypes.ADD_MOVIE_TO_WATCHLIST,
                payload: { userId, movie },
            });
            showNotification(`${movie.Title} Successfully Added!`);
        } else {
            showNotification(`${movie.Title} is already in the Watchlist!`);
        }
    };

    const handleRemoveFromWatchlist = () => {
        if (isInWatchlist) {
            dispatch({
                type: ActionTypes.DELETE_MOVIE_FROM_WATCHLIST,
                payload: { userId, movieId: movie.imdbID },
            });
            showNotification(`${movie.Title} Removed from Watchlist`);
        } else {
            showNotification(`${movie.Title} is not in the Watchlist!`);
        }
    };

    console.log("movieDetails", movieDetails);

    const renderRatingScore = (rating) => {
        if (rating?.Source === "Rotten Tomatoes") {
            return (
                <div className="movieDetails__rating">
                    <span className="movieDetails__rating-icon">
                        <SiRottentomatoes />
                    </span>
                    <span className="movieDetails__rating-value">
                        {rating.Value}
                    </span>
                </div>
            );
        }
        if (rating?.Source === "Internet Movie Database") {
            return (
                <div className="movieDetails__rating">
                    <span className="movieDetails__rating-icon">
                        <FaImdb />
                    </span>
                    <span className="movieDetails__rating-value">
                        {rating.Value}
                    </span>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <div className="movieDetails">
                    <div className="movieDetails__poster">
                        <img
                            src={movieDetails?.Poster}
                            alt={movieDetails?.Title}
                        />
                    </div>
                    <div className="movieDetails__info">
                        <h2 className="movieDetails__title">
                            {movieDetails?.Title}
                        </h2>
                        <div className="movieDetails__sub">
                            <p>{movieDetails?.Year}</p>
                            <p>{movieDetails?.Runtime}</p>
                        </div>
                        <div className="movieDetails__ratings">
                            {movieDetails?.Ratings.map((rating, index) =>
                                renderRatingScore(rating)
                            )}
                        </div>
                        <p className="movieDetails__plot">
                            <span>Plot:</span> {movieDetails?.Plot}
                        </p>
                        <p className="movieDetails__genre">
                            <span>Genre:</span> {movieDetails?.Genre}
                        </p>
                        <p className="movieDetails__director">
                            <span>Director:</span> {movieDetails?.Director}
                        </p>
                        <p className="movieDetails__actors">
                            <span>Actors:</span> {movieDetails?.Actors}
                        </p>

                        <button
                            className="action"
                            onClick={
                                isInWatchlist
                                    ? handleRemoveFromWatchlist
                                    : handleAddToWatchlist
                            }
                            data-watchlist-action={isInWatchlist ? "yes" : "no"}
                        >
                            {isInWatchlist
                                ? "Remove from Watchlist"
                                : "Add to Watchlist"}
                        </button>
                    </div>
                    {notification.showMessage && (
                        <Notification message={notification.message} />
                    )}
                </div>
            )}
        </>
    );
};

export default MovieDetails;
