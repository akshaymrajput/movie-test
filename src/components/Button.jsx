import React from "react";
import "./Button.css";

const Button = ({ children, onClick, className }) => {
    const buttonClasses = `action ${className || ""}`;

    return (
        <button className={buttonClasses.trim()} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
