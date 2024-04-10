import React, { useContext, useState } from "react";
import {
    BiSolidMoviePlay,
    BiSolidHome,
    BiDotsHorizontalRounded,
    BiSolidBookmarkHeart,
    BiSearch,
} from "react-icons/bi";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import GlobalContext, { ActionTypes } from "../contexts/GlobalContext";
import Button from "./Button";

const Sidebar = () => {
    const { email, dispatch } = useContext(GlobalContext);

    const [show, setShow] = useState(false);

    const logout = () => {
        dispatch({ type: ActionTypes.LOGOUT });
    };

    const links = [
        {
            title: "Home",
            path: "/",
            icon: <BiSolidHome />,
            cName: "link",
        },
        {
            title: "Watchlist",
            path: "/watchlist",
            icon: <BiSolidBookmarkHeart />,
            cName: "link",
        },
    ];

    const handleProfileOptionsClick = () => {
        setShow(!show);
    };

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__top-logo-box">
                    <div className="sidebar__top-icon-container">
                        <BiSolidMoviePlay />
                    </div>
                    <div className="sidebar__top-logo-text">
                        <span>Watch</span>
                        <span>list</span>
                    </div>
                </div>
            </div>
            <div className="sidebar__middle">
                <div className="sidebar__middle-nav-links">
                    {links.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) => {
                                return isActive ? "link active" : "link";
                            }}
                        >
                            <div className="link-icon-container">
                                {link.icon}
                            </div>
                            <span>{link.title}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="sidebar__bottom">
                <div
                    className="sidebar__bottom-profile"
                    onClick={handleProfileOptionsClick}
                >
                    <div>
                        <div className="sidebar__bottom-avatar-container">
                            <img
                                src="https://avatar.iran.liara.run/public/7"
                                alt="avatar"
                            />
                        </div>
                        <div className="sidebar__bottom-user">
                            <p>{email}</p>
                        </div>
                    </div>

                    <div className="sidebar__bottom-options">
                        <BiDotsHorizontalRounded />
                        <Button
                            className={show ? "d-block" : "d-none"}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
