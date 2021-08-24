import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => {
      return user._id !== userId;
    });
    setUsers(newUsers);
  };
  const renderPhrase = (number) => {
    if (number === 0) {
      return "Никто с тобой не тусанет";
    }
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return number + " человек тусанет с тобой сегодня";
    }
    n %= 10;
    if (n === 1) {
      return number + " человек тусанет с тобой сегодня";
    }
    if (n >= 2 && n <= 4) {
      return number + " человека тусанут с тобой сегодня";
    }
    return number + " человека тусанут с тобой сегодня";
  };

  const getBadgeClasses = (color) => "badge m-1 bg-" + color;
  const getBadgeClassesTitle = (count) => {
    let classes = "badge bg-";
    classes += count === 0 ? "danger" : "primary";
    return classes;
  };
  const listItemQualities = (qualities) => {
    return qualities.map((q) => (
      <span key={q._id} className={getBadgeClasses(q.color)}>
        {q.name}
      </span>
    ));
  };
  const listItems = users.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{listItemQualities(item.qualities)}</td>
      <td>{item.profession.name}</td>
      <td>{item.completedMeetings}</td>
      <td>{item.rate}/5</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  const tableHTML = (n) => {
    if (n > 0) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      );
    }
  };
  return (
    <>
      <h1>
        <span className={getBadgeClassesTitle(users.length)}>
          {renderPhrase(users.length)}
        </span>
      </h1>
      {tableHTML(users.length)}
    </>
  );
};

export default Users;
