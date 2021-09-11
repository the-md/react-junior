import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({
  users: allUsers,
  onDelete,
  onToggleBookMark,
  status,
  ...rest
}) => {
  const count = allUsers.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const users = paginate(allUsers, currentPage, pageSize);

  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                onDelete={onDelete}
                onToggleBookMark={onToggleBookMark}
                {...user}
                {...rest}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired
};

export default Users;
