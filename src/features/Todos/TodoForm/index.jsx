import React, { memo } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import useStyles from "./theme.todoForm";
import "./todoForm.scss";
import { Box, IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';

function TodoForm({ handleCloseForm, text, handleChange, children, placeholder, isLists }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TextareaAutosize
        autoFocus
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className={classes.textarea}
        rowsMin={isLists ? "2" : "4"}
      />
      <Box display="flex" mt={1}>
        {children}
        <IconButton onClick={handleCloseForm} style={{ marginLeft: "8px" }}>
          <ClearIcon fontSize="default" color="error" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default memo(TodoForm);
