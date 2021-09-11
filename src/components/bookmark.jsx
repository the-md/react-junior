import React from "react";

const BookMark = ({ status, ...rest }) => {
  const getBookMarkClasses = (status) => {
    let classes = "bi bi-";
    classes += status ? "bookmark-fill" : "bookmark";
    return classes;
  };
  return <i className={getBookMarkClasses(status)}></i>;
};

export default BookMark;
