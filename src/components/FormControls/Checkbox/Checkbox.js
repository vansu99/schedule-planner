import React, { memo } from "react";
import PropTypes from "prop-types";
import "./checkbox.scss";

function Checkbox({ name, option, selected, onChange, handleRemoveCheckList }) {
  const removeCheckList = () => {
    if (handleRemoveCheckList) {
      handleRemoveCheckList(option.value);
    }
  };

  return (
    <div className="todoCard-details__checklist-list-item">
      <label htmlFor={option.value} className={selected ? "chk__todo" : null}>
        <input
          type="checkbox"
          className="green"
          name={name}
          id={option.value}
          value={option.value}
          checked={Boolean(selected)}
          onChange={onChange}
        />
        {option.text}
      </label>
      <button onClick={removeCheckList}>
        <i className="bx bx-x"></i>
      </button>
    </div>
  );
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  option: PropTypes.object,
  handleRemoveCheckList: PropTypes.func
};

export default memo(Checkbox);
