import React, { useContext } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "./App.css";
import GlobalContext from "./contexts/GlobalContext";

const App = () => {
    const { loggedIn } = useContext(GlobalContext);

    return (
        <div className="app">
            {loggedIn ? (
                <>
                    <Sidebar />
                    <div className="content">
                        <Outlet />
                    </div>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default App;
