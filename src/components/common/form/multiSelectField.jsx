import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, name, label, onChange, defaultValue }) => {
  let optionsArray = options;
  if (!Array.isArray(options) && typeof options === "object") {
    optionsArray = Object.keys(options).map((optionName) => ({
      label: options[optionName].name,
      value: options[optionName]._id
    }));
  }

  console.log("defaultValue1", defaultValue);
  // const defaultValueArray = {
  //   label: "Странный",
  //   value: "67rdca3eeb7f6fgeed471100"
  // };
  const defaultValueArray = defaultValue.map((item) => ({
    label: item.name,
    value: item._id
  }));
  console.log("defaultValue2", defaultValue);

  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        defaultValue={defaultValueArray}
      />
    </div>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
};

export default MultiSelectField;
