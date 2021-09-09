import React from "react";

const SearchStatus = ({ length }) => {
  const getBadgeClassesTitle = (count) => {
    let classes = "badge bg-";
    classes += count === 0 ? "danger" : "primary";
    return classes;
  };
  const renderPhrase = (
    number,
    words = [
      " человек тусанет с тобой сегодня",
      " человека тусанут с тобой сегодня",
      " человек тусанет с тобой сегодня",
    ]
  ) => {
    if (number === 0) return "Никто с тобой не тусанет";
    let num1 = Math.abs(number) % 100;
    let num2 = num1 % 10;
    if (num1 > 10 && num1 < 20) return number + words[2];
    if (num2 > 1 && num2 < 5) return number + words[1];
    if (num2 === 1) return number + words[0];
    return number + words[2];
  };
  return (
    <h1>
      <span className={getBadgeClassesTitle(length)}>
        {renderPhrase(length)}
      </span>
    </h1>
  );
};

export default SearchStatus;
