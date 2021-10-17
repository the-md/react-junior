import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => {
  const getBadgeClasses = (color) => "badge m-1 bg-" + color;
  return (
    <span key={_id} className={getBadgeClasses(color)}>
      {name}
    </span>
  );
};
Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default Qualitie;
