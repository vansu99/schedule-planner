import React, { useState } from 'react';
import { Collapse, Paper, Typography } from '@material-ui/core';
import { fade, makeStyles } from "@material-ui/core/styles";
import TodoForm from './index';
import { useDispatch } from 'react-redux';
import { todosActions } from '../../../actions/Todos';
import { v4 as uuidv4  } from 'uuid';

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
  },
  btnAddCard: {
    fontFamily: "Poppins, sans-serif",
    fontSize: '1.5rem'
  }
}))

export default function TodoFormContainer({ listId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const onChange = (e) => {
    setTitle(e.target.value);
  }

  const handleAddList = () => {
    if(title === "") return;
    const listID = `list-${uuidv4()}`;
    const newList = { listID, title, cards: [] };
    setTitle("");
  }

  const handleAddCard = () => {
    if (title === '') return;

    const id = `card-${uuidv4()}`;
    const newCards = {
      id,
      title,
      list: listId,
      member: []
    };
    dispatch(todosActions.asyncAddTodoCard(newCards));
    setTitle('');
  }

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <TodoForm
          setOpen={setOpen}
          text={title}
          handleChange={onChange}
        >
          <button
            type="submit"
            className="todoForm__button todoForm__button--ok"
            onClick={handleAddCard}
          >
            Save
          </button>
        </TodoForm>
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addCard} elevation={0} onClick={() => setOpen(!open)}>
          <Typography className={classes.btnAddCard}>+ Add to card</Typography>
        </Paper>
      </Collapse>
    </div>
  )
}
