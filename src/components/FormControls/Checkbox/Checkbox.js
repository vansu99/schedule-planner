import React, { memo } from "react";
import PropTypes from "prop-types";
import "./checkbox.scss";

function Checkbox({ name, option, selected, onChange }) {
  return (
    <label>
      <input
        type="checkbox"
        className="green"
        name={name}
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
  option: PropTypes.object,
};

export default memo(Checkbox);
