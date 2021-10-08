import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UsersTable from "./usersTable";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);
  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => {
      return user._id !== userId;
    });
    setUsers(newUsers);
  };
  const handleToggleBookMark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        if (user.bookmark !== true) {
          user.bookmark = true;
        } else {
          user.bookmark = false;
        }
      }
      return user;
    });
    setUsers(newUsers);
  };

  const pageSize = 4;
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleprofessionSelect = (item) => {
    setSearch("");
    setSelectedProf(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  const handleSearch = ({ target }) => {
    setSelectedProf();
    setSearch(target.value);
  };

  if (users) {
    let filteredUsers = selectedProf
      ? users.filter((user) => _.isEqual(user.profession, selectedProf))
      : users;
    if (search) {
      filteredUsers = users.filter(
        (user) => user.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );
    }

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSearch("");
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleprofessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <div>
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading ...";
};
UsersList.propTypes = {
  users: PropTypes.array
};

export default UsersList;
