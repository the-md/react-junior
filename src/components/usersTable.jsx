import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete,
  ...rest
}) => {
  const columns = {
    // name: { path: "name", name: "Имя" },
    name: {
      path: "name",
      name: "Имя",
      component: (user) => (
        <Link className="link" to={`users/${user._id}`}>
          {user.name}
        </Link>
      )
    },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      )
    }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
