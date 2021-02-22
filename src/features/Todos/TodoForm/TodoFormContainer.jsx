import React, { useState } from 'react';
import { Collapse, Paper, Typography } from '@material-ui/core';
import { fade, makeStyles } from "@material-ui/core/styles";
import TodoForm from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1)
  },
  addCard: {
    padding: theme.spacing(1,1,1,2),
    margin: theme.spacing(0,1,1,1),
    backgroundColor: "#EBECF0",
    fontFamily: "Poppins, sans-serif",
    "&:hover": {
      backgroundColor: fade("#000", 0.25),
      cursor: "pointer"
    }
  }
}))

export default function TodoFormContainer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <TodoForm setOpen={setOpen} />
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addCard} elevation={0} onClick={() => setOpen(!open)}>
          <Typography>+ Add to card</Typography>
        </Paper>
      </Collapse>
    </div>
  )
}
