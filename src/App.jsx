import React from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "./App.css";
import GlobalContext, { GlobalProvider } from "./contexts/GlobalContext";

function App() {
    return (
        <GlobalProvider>
            <div className="app">
                <GlobalContext.Consumer>
                    {({ loggedIn }) => (
                        <>
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
                        </>
                    )}
                </GlobalContext.Consumer>
            </div>
        </GlobalProvider>
    );
}

export default App;
