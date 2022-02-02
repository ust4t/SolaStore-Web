import { Fragment } from "react";

const InputGroup = ({
  label,
  handleChange,
  handleBlur,
  values,
  errors,
  placeholder,
  id,
  type,
  name,
  labelClassName,
  formClassName,
  containerClass,
  touched,
  ...rest
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={id} className={labelClassName}>
        {label} <span className="required">*</span>
      </label>
      <input
        id={id}
        type={type ? type : "text"}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
        placeholder={placeholder}
        className={`form-control txth mb-0 ${
          errors && touched ? "border border-3 rounded-3 border-danger" : ""
        } ${formClassName}`}
        {...rest}
      />
      <div
        id="val-username1-error"
        className="invalid-feedback animated fadeInUp mb-3"
        style={{ display: "block" }}>
        {errors && errors}
      </div>
    </div>
  );
};

export default InputGroup;
