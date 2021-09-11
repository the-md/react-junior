import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  onToggleBookMark,
  bookmark,
}) => {
  const listItemQualities = (qualities) => {
    return qualities.map((q) => (
      <Qualitie key={q._id} name={q.name} color={q.color} />
    ));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{listItemQualities(qualities)}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => onToggleBookMark(_id)}
        >
          <BookMark status={bookmark} />
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
