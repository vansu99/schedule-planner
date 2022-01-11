import { InputBase, Typography } from '@material-ui/core';
import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useStyles from './theme.TodoList';

export default function TitleCpt({
  title,
  open,
  onChange,
  setOpen,
  handleRemoveList,
  handleEditTitleList,
}) {
  const classes = useStyles();

  const editTitleList = (e) => {
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
              className: classes.input,
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
            <Typography variant="h5" component="h5" color="textPrimary">
              {title}
            </Typography>
          </div>
          <button className={classes.icon} onClick={removeList}>
            <DeleteOutlineIcon />
          </button>
        </div>
      )}
    </React.Fragment>
  );
}
