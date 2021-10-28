import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api";

const Comment = ({ content, created_at, userId, _id, onDelete }) => {
  const [autor, setAutor] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setAutor(data);
    });
  }, []);
  const dateCreated = Number(created_at);
  const dateObj = new Date(dateCreated);
  const dateMinutes = dateObj.getMinutes();
  const dateHours = dateObj.getHours();
  const dateDay = dateObj.getDate();
  const dateMonth = dateObj.toLocaleString("en", { month: "long" });
  const dateYear = dateObj.getFullYear();

  const differenceInTime = (Date.now() - dateCreated) / 1000;
  let dateComment = dateDay + " " + dateMonth + " " + dateYear;
  if (differenceInTime <= 60) {
    dateComment = "1 минуту назад";
  } else if (differenceInTime > 60 && differenceInTime <= 300) {
    dateComment = "5 минут назад";
  } else if (differenceInTime > 300 && differenceInTime <= 600) {
    dateComment = "10 минут назад";
  } else if (differenceInTime > 600 && differenceInTime <= 1800) {
    dateComment = "30 минут назад";
  } else if (differenceInTime > 1800 && differenceInTime <= 86400) {
    dateComment = dateMinutes + ":" + dateHours;
  } else if (differenceInTime > 86400 && differenceInTime <= 31536000) {
    dateComment = dateDay + " " + dateMonth;
  }

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {autor && autor.name}
                    {" - "}
                    <span className="small">{dateComment}</span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onDelete(_id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Comment.propTypes = {
  content: PropTypes.string,
  created_at: PropTypes.string,
  userId: PropTypes.string,
  _id: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};
export default Comment;
