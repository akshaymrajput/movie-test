import React from "react";
import ReactDOM from "react-dom";
import "./Notification.css";

const Notification = ({ message }) => {
    return ReactDOM.createPortal(
        <div className="notification">
            <p>{message}</p>
        </div>,
        document.getElementById("notification-root")
    );
};

export default Notification;
