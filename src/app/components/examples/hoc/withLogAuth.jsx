import React from "react";
import SmallTitle from "../../common/typografy/smallTitle";

const withLogAuth = (Component) => (props) => {
    const isLogin = localStorage.getItem("user");
    return (
        <>
            {isLogin ? (
                <>
                    <Component {...props} />
                    <SmallTitle>Login</SmallTitle>
                </>
            ) : (
                <SmallTitle>Logout</SmallTitle>
            )}
        </>
    );
};

export default withLogAuth;
