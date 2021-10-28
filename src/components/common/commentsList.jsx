import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import api from "../../api";

const CommentsList = ({ userId }) => {
  const [comments, setComments] = useState();
  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data);
    });
  }, []);

  const handleDetele = () => {
    api.comments.remove(_id).then((data) => {
      console.log(data);
    });
  };
  const handleSubmitComment = (e) => {
    console.log(e);
    e.preventDefault();
  };

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <form onSubmit={handleSubmitComment}>
            <h2>New comment</h2>
            <div className="mb-4">
              <select className="form-select" name="userId" value="">
                <option disabled value="" selected>
                  Выберите пользователя
                </option>

                <option>Доктор</option>
                <option>Тусер</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Сообщение
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4">
              <button className="btn btn-primary">Опубликовать</button>
            </div>
          </form>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {comments
            ? comments.map((c) => (
                <Comment key={c._id} {...c} onDelete={handleDetele} />
              ))
            : "loading..."}
        </div>
      </div>
    </>
  );
};
CommentsList.propTypes = {
  userId: PropTypes.string
};

export default CommentsList;
