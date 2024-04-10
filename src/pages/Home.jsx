import React from "react";
import Search from "../components/Search";
import "./Home.css";

function Home() {
    return (
        <div className="home">
            <div className="banner">
                <p className="title">Welcome to Watchlist</p>
                <p className="sub-title">
                    Browse movies, add them to watchlists and share them with
                    friends.
                </p>
            </div>

            <Search />
        </div>
    );
}

export default Home;
