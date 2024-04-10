import { useState } from "react";

const useNotification = () => {
    const [notification, setNotification] = useState({
        showMessage: false,
        message: "Success",
    });

    const showNotification = (message) => {
        setNotification({ showMessage: true, message });
        setTimeout(() => {
            setNotification((prevNotification) => ({
                ...prevNotification,
                showMessage: false,
            }));
        }, 3000);
    };

    return { notification, showNotification };
};

export default useNotification;
