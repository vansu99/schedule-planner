import React, { memo } from 'react';
import "./todoForm.scss";

function TodoForm({ setOpen, text, handleChange, children  }) {

  return (
    <div className="todoForm__list">
      <textarea
        className="todoForm__input"
        value={text}
        onChange={handleChange}
        placeholder="Enter a title of this card..."
        rows="4"
      />
      <div className="todoForm__confirm">
        {children}
        <button className="todoForm__button" onClick={() => setOpen(false)}>
          <i className='bx bx-x todoForm__button-icon'></i>
        </button>
      </div>
    </div>
  )
}

export default memo(TodoForm);
