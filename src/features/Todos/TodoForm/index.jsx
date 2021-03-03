import React, { memo } from "react";
import "./todoForm.scss";

function TodoForm({ handleCloseForm, text, handleChange, children, placeholder, isLists }) {
  return (
    <div className="todoForm__list">
      <textarea
        autoFocus
        className="todoForm__input"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows={isLists ? "2" : "4"}
      />
      <div className="todoForm__confirm">
        {children}
        <button className="todoForm__button" onClick={handleCloseForm}>
          <i className="bx bx-x todoForm__button-icon"></i>
        </button>
      </div>
    </div>
  );
}

export default memo(TodoForm);
