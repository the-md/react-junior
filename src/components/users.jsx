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

  const renderPhrase = (
    number,
    words = [
      " человек тусанет с тобой сегодня",
      " человека тусанут с тобой сегодня",
      " человек тусанет с тобой сегодня",
    ]
  ) => {
    if (number === 0) return "Никто с тобой не тусанет";
    let num1 = Math.abs(number) % 100;
    let num2 = num1 % 10;
    if (num1 > 10 && num1 < 20) return number + words[2];
    if (num2 > 1 && num2 < 5) return number + words[1];
    if (num2 == 1) return number + words[0];
    return number + words[2];
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
