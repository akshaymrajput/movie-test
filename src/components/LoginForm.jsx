import React, { useState, useContext } from "react";
import GlobalContext, { ActionTypes } from "../contexts/GlobalContext";
import "./LoginForm.css";
import useNotification from "../hooks/useNotification";
import Notification from "./Notification";
import Button from "./Button";

function LoginForm() {
    const { dispatch, emailError } = useContext(GlobalContext);
    const { notification, showNotification } = useNotification();
    const [email, setEmail] = useState("");
    const [isSignup, setIsSignup] = useState(false);

    const validateEmail = (input) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(input);
    };

    const handleAction = () => {
        if (isSignup) {
            handleSignup();
        } else {
            handleLogin();
        }
    };

    const handleLogin = () => {
        if (validateEmail(email)) {
            dispatch({ type: ActionTypes.LOGIN, payload: { email } });
            if (emailError) {
                showNotification(emailError);
            }
        } else {
            showNotification("Please enter a valid email address");
        }
    };

    const handleSignup = () => {
        if (validateEmail(email)) {
            dispatch({ type: ActionTypes.SIGNUP, payload: { email } });
            if (emailError) {
                showNotification(emailError);
            }
        } else {
            showNotification("Please enter a valid email address");
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const toggleSignup = () => {
        setIsSignup(!isSignup);
    };

    return (
        <div className="form__container">
            {notification.showMessage && (
                <Notification message={notification.message} />
            )}
            <div
                className={
                    isSignup
                        ? "form__container-signup"
                        : "form__container-login"
                }
            >
                <h2 className="form__container-title">
                    {isSignup
                        ? "Create a new account"
                        : "Already have an account?"}
                </h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Button onClick={handleAction} useDefaultClass={true}>
                    {isSignup ? "Signup" : "Login"}
                </Button>
            </div>

            <div className="form__container-signup">
                <p>
                    {isSignup
                        ? "Already have an account? "
                        : "Don't have an account yet? "}
                    <span onClick={toggleSignup}>
                        {isSignup ? "Login here" : "Signup here"}
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
