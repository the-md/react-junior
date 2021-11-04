import React from "react";
import PropTypes from "prop-types";

const SelectFieldUsers = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputValid = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    // let optionsArray = options;
    // if (!Array.isArray(options) && typeof options === "object") {
    //     optionsArray = Object.keys(options).map((optionName) => ({
    //         name: options[optionName].name,
    //         value: options[optionName]._id
    //     }));
    // }

    const optionsArray = options.map((optionName) => ({
        name: optionName.name,
        value: optionName._id
    }));

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getInputValid()}
                id="validationCustom04"
                name="user"
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectFieldUsers.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};

export default SelectFieldUsers;
