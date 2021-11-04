import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserPageEdit from "../components/page/userPageEdit";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {userId ? (
                edit ? (
                    <UserPageEdit id={userId} />
                ) : (
                    <UserPage id={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
