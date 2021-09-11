import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => {
      return user._id !== userId;
    });
    setUsers(newUsers);
  };

  const handleToggleBookMark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = user.bookmark != true ? true : false;
      }
      return user;
    });
    setUsers(newUsers);
  };
  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </div>
  );
}

export default App;
