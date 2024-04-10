import React, { createContext, useEffect, useReducer } from "react";

export const ActionTypes = {
    LOGIN: "LOGIN",
    SIGNUP: "SIGNUP",
    LOGOUT: "LOGOUT",
    SET_SIGNUP_LIST: "SET_SIGNUP_LIST",
    ADD_MOVIE_TO_WATCHLIST: "ADD_MOVIE_TO_WATCHLIST",
    DELETE_MOVIE_FROM_WATCHLIST: "DELETE_MOVIE_FROM_WATCHLIST",
};

const initialState = {
    loggedIn: false,
    userId: "",
    email: "",
    emailError: "",
    signupList: JSON.parse(localStorage.getItem("signupList")) || [],
    watchlists: JSON.parse(localStorage.getItem("watchlists")) || {},
    isLoggedIn: false,
};

const validateEmail = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
};

const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            if (validateEmail(action.payload.email)) {
                const existingUser = state.signupList.find(
                    (user) => user.email === action.payload.email
                );

                if (existingUser) {
                    return {
                        ...state,
                        loggedIn: true,
                        userId: existingUser.userId,
                        email: action.payload.email,
                        isLoggedIn: true,
                        emailError: "",
                    };
                } else {
                    return {
                        ...state,
                        emailError: "Email not found. Please sign up first.",
                    };
                }
            } else {
                return {
                    ...state,
                    emailError: "Please enter a valid email address",
                };
            }

        case ActionTypes.SIGNUP:
            if (validateEmail(action.payload.email)) {
                const existingUser = state.signupList.find(
                    (user) => user.email === action.payload.email
                );
                if (!existingUser) {
                    const newUser = {
                        email: action.payload.email,
                        userId: Date.now().toString(),
                    };
                    return {
                        ...state,
                        loggedIn: true,
                        userId: newUser.userId,
                        email: action.payload.email,
                        isLoggedIn: true,
                        emailError: "",
                        signupList: [...state.signupList, newUser],
                        watchlists: {
                            ...state.watchlists,
                            [newUser.userId]: [],
                        },
                    };
                } else {
                    return {
                        ...state,
                        emailError:
                            "Email already exists. Please use a different email address.",
                    };
                }
            } else {
                return {
                    ...state,
                    emailError: "Please enter a valid email address",
                };
            }

        case ActionTypes.LOGOUT:
            localStorage.removeItem("loggedInEmail");
            localStorage.removeItem("userId");
            return {
                ...state,
                loggedIn: false,
                userId: "",
                email: "",
                isLoggedIn: false,
            };

        case ActionTypes.SET_SIGNUP_LIST:
            return {
                ...state,
                signupList: action.payload,
            };

        case ActionTypes.ADD_MOVIE_TO_WATCHLIST:
            return {
                ...state,
                watchlists: {
                    ...state.watchlists,
                    [action.payload.userId]: [
                        ...state.watchlists[action.payload.userId],
                        action.payload.movie,
                    ],
                },
            };

        case ActionTypes.DELETE_MOVIE_FROM_WATCHLIST:
            const updatedMovies = state.watchlists[
                action.payload.userId
            ].filter((movie) => movie.imdbID !== action.payload.movieId);

            return {
                ...state,
                watchlists: {
                    ...state.watchlists,
                    [action.payload.userId]: updatedMovies,
                },
            };

        default:
            return state;
    }
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("loggedInEmail");
        const savedUserId = localStorage.getItem("userId");

        if (isLoggedIn && savedUserId) {
            dispatch({
                type: ActionTypes.LOGIN,
                payload: { userId: savedUserId, email: isLoggedIn },
            });
        }

        const savedSignupList = localStorage.getItem("signupList");
        if (savedSignupList) {
            dispatch({
                type: ActionTypes.SET_SIGNUP_LIST,
                payload: JSON.parse(savedSignupList),
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("signupList", JSON.stringify(state.signupList));
    }, [state.signupList]);

    useEffect(() => {
        if (state.userId) {
            localStorage.setItem("loggedInEmail", state.email);
            localStorage.setItem("userId", state.userId);
        }
    }, [state.userId, state.email]);

    useEffect(() => {
        localStorage.setItem("watchlists", JSON.stringify(state.watchlists));
    }, [state.watchlists]);

    const {
        loggedIn,
        userId,
        email,
        emailError,
        signupList,
        watchlists,
        isLoggedIn,
    } = state;

    return (
        <GlobalContext.Provider
            value={{
                loggedIn,
                userId,
                email,
                emailError,
                signupList,
                watchlists: watchlists[userId] || null,
                isLoggedIn,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
