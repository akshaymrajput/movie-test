import React from "react";
import "./Loader.css";
import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="loader">
            <ProgressBar
                visible={true}
                height="80"
                width="80"
                color="#ff0000"
                barColor="#ff0000"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;
