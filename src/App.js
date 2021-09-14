import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
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
  return (
    <div>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </div>
  );
}

export default App;
