import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data);
    });
  }, []);

  const history = useHistory();
  const handleEdit = () => {
    history.push(`/users/${id}/edit`);
  };
  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <div>
          <Qualities qualities={user.qualities} />
        </div>
        <h3>completedMeetings: {user.completedMeetings}</h3>
        <h2>rate: {user.rate}</h2>
        <button
          onClick={() => {
            handleEdit();
          }}
        >
          Изменить
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
