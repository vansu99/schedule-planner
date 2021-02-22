import React, { memo, useState } from 'react';
import "./todoForm.scss";

function TodoForm({ setOpen }) {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <div className="todoForm__list">
      <textarea
        className="todoForm__input"
        value={title}
        onChange={handleChange}
        placeholder="Enter a title of this card..."
        rows="4"
        onBlur={() => setOpen(false)}
      />
      <div className="todoForm__confirm">
        <button type="submit" className="todoForm__button todoForm__button--ok">
          Add Card
        </button>
        <button className="todoForm__button" onClick={() => setOpen(false)}>
          <i className='bx bx-x todoForm__button-icon'></i>
        </button>
      </div>
    </div>
  )
}

export default memo(TodoForm);
