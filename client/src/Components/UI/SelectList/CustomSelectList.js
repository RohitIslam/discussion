import React from "react";
import classnames from "classnames";

const CustomSelectList = ({ name, value, errors, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.key} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

export default CustomSelectList;
