import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputValid = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className={"input-group" + (error ? " has-validation" : "")}>
                <textarea
                    id={name}
                    name={name}
                    onChange={handleChange}
                    className={getInputValid()}
                    rows="3"
                >
                    {value}
                </textarea>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
