import { InputBase } from "@material-ui/core";
import React from "react";
import useStyles from "./theme.TodoList";

export default function TitleCpt({ title, open, onChange, setOpen, handleRemoveList, handleEditTitleList }) {
  const classes = useStyles();

  const editTitleList = e => {
    if (handleEditTitleList && e.keyCode === 13) {
      handleEditTitleList();
    }
  };

  const removeList = () => {
    if (handleRemoveList) {
      handleRemoveList();
    }
  };

  return (
    <React.Fragment>
      {open ? (
        <div>
          <InputBase
            autoFocus
            value={title}
            inputProps={{
              className: classes.input
            }}
            fullWidth
            onChange={onChange}
            onBlur={() => setOpen(!open)}
            onKeyDown={editTitleList}
          />
        </div>
      ) : (
        <div className={classes.editTitleContainer}>
          <div onClick={() => setOpen(!open)} className={classes.editTitle}>
            <span>{title}</span>
          </div>
          <button className="todoList__button" onClick={removeList}>
            <i className="bx bx-trash"></i>
          </button>
        </div>
      )}
    </React.Fragment>
  );
}
