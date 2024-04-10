import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Notification.css";

const Notification = ({ message }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return ReactDOM.createPortal(
        <div className={`notification ${show ? "show" : "hide"}`}>
            <p>{message}</p>
        </div>,
        document.getElementById("notification-root")
    );
};

export default Notification;
