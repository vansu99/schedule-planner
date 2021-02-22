import React from "react";
import { Typography, InputBase } from "@material-ui/core";
import useStyles from "./theme.TodoList";

export default function TitleCpt({ title, open, setOpen }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {
        open ?
        <div>
          <InputBase
            autoFocus
            value="Todo ..."
            inputProps={{
              className: classes.input
            }}
            fullWidth
            onBlur={() => setOpen(!open)}
          />
        </div>
        :
        <div className={classes.editTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editTitle}
          >
            {title}
          </Typography>
          <i className='bx bx-dots-horizontal-rounded'></i>
        </div>
      }
    </React.Fragment>
  );
}
