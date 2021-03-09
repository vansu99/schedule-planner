import React, { memo } from "react";
import PropTypes from "prop-types";
import "./checkbox.scss";

function Checkbox({ name, option, selected, onChange }) {
  return (
    <label htmlFor={option.value} className={selected ? "chk__todo" : null}>
      <input
        type="checkbox"
        className="green"
        name={name}
        id={option.value}
        value={option.value}
        checked={selected}
        onChange={onChange}
      />
      {option.text}
    </label>
  );
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  option: PropTypes.object
};

export default memo(Checkbox);
