import React from "react";

const Qualitie = ({ color, name, id }) => {
  const getBadgeClasses = (color) => "badge m-1 bg-" + color;
  return (
    <span key={id} className={getBadgeClasses(color)}>
      {name}
    </span>
  );
};

export default Qualitie;
