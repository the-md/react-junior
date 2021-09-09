import React from "react";

const BookMark = ({ status, onToggleBookMark, ...rest }) => {
  const getBookMarkClasses = (status) => {
    let classes = "bi bi-";
    classes += status === false ? "bookmark" : "bookmark-fill";
    return classes;
  };
  return <i className={getBookMarkClasses()}></i>;
};

export default BookMark;
