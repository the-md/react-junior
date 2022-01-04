import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
    const [log, setLog] = useState(false);

    console.log(onLogin);
    console.log(onLogOut);
    console.log(isAuth);

    const handleOnLogin = () => {
        localStorage.setItem("user", "isAuth");
        setLog(true);
    };
    const handleOnLogOut = () => {
        localStorage.removeItem("user");
        setLog(false);
    };
    useEffect(() => {
        console.log("render");
    }, [log]);

    const isLogin = localStorage.getItem("user") === "isAuth";

    return (
        <>
            {isLogin ? (
                <button
                    className="btn btn-primary mx-2"
                    onClick={handleOnLogOut}
                >
                    logout
                </button>
            ) : (
                <button
                    className="btn btn-primary mx-2"
                    onClick={handleOnLogin}
                >
                    login
                </button>
            )}
        </>
    );
};
SimpleComponent.propTypes = {
    isAuth: PropTypes.string,
    onLogin: PropTypes.string,
    onLogOut: PropTypes.string
};
export default SimpleComponent;
