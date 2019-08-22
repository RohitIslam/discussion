import React from "react";
import classnames from "classnames";

const CustomInput = ({
  name,
  placeholder,
  value,
  type,
  info,
  onChange,
  lable,
  disabled,
  errors
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

CustomInput.defaultProps = {
  type: "text"
};

export default CustomInput;
