import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, id }) => {
  const getBadgeClasses = (color) => "badge m-1 bg-" + color;
  return (
    <span key={id} className={getBadgeClasses(color)}>
      {name}
    </span>
  );
};
Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default Qualitie;
