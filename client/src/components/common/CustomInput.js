import React from "react";
import classnames from "classnames";

export default ({
    type,
    name,
    id,
    label,
    placeholder,
    value,
    onSubmit,
    onChange,
    addClass,
    disabled,
    readOnly,
    error,
    required,
    min,
    max,
    step
}) => {
    return (
        <div className={addClass}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                className={classnames("form-control", { isInvalid: error })}
                onChange={onChange}
                onSubmit={onSubmit}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                value={value}
                required={required}
                min={min}
                max={max}
                step={step}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
