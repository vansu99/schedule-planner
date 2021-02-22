import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './theme.TodoList';
import Title from './titleCpt.jsx';
import TodoCard from '../TodoCard';
import TodoFormContainer from '../TodoForm/TodoFormContainer';

export default function TodoList({ listId, title, cards }) {
  console.log(cards);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Paper className={classes.root}>
      <Title title={title} open={open} setOpen={setOpen} />
      { cards.map(card => (
        <TodoCard
          cardId={card.id}
          title={card.title}
          key={card.id}
          member={card.member}
          listId={listId}
        />
      )) }
      <TodoFormContainer />
    </Paper>
  )
}
