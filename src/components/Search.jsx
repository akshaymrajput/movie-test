import React, { useState } from "react";
import SearchResult from "./SearchResult";
import axios from "axios";
import "./Search.css";
import { BiSearch } from "react-icons/bi";
import Loader from "./Loader";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://www.omdbapi.com/?apikey=${
                    import.meta.env.VITE_API_KEY
                }&s=${query}`
            );
            setLoading(false);
            setResults(response.data.Search);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <>
            <form className="search" onSubmit={handleSubmit}>
                <div className="search__input">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search movies..."
                    />
                    <div className="search__input-icon-container">
                        <BiSearch />
                    </div>
                </div>
                <button className="search__button" onClick={handleSearch}>
                    Search
                </button>
            </form>
            {loading && <Loader />}
            {!loading && <SearchResult movies={results} />}
        </>
    );
};

export default Search;
