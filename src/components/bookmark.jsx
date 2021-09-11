import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  const getBookMarkClasses = (status) => {
    let classes = "bi bi-";
    classes += status ? "bookmark-fill" : "bookmark";
    return classes;
  };
  return <i className={getBookMarkClasses(status)}></i>;
};
BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;
