import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

function InputForm({ type = "text" }) {
  const inputRef = useRef(null);
  return (
    <>
      <input type={type} ref={inputRef} />
    </>
  );
}

InputForm.propTypes = {
  type: PropTypes.string
};

export default InputForm;
