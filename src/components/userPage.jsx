import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data);
    });
  }, []);

  const history = useHistory();
  const handleAllUsers = () => {
    history.push("/users");
  };
  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <div>
          <QualitiesList qualities={user.qualities} />
        </div>
        <h3>completedMeetings: {user.completedMeetings}</h3>
        <h2>rate: {user.rate}</h2>
        <button
          onClick={() => {
            handleAllUsers();
          }}
        >
          Все пользователи
        </button>
      </>
    );
  }
  return "loading ...";
};
UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
