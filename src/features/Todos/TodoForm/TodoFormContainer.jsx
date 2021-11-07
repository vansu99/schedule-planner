import { Button, Collapse, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { activityActions } from 'actions/Activity/activity.action';
import { cardActions } from 'actions/Todos/card.action';
import { listActions } from 'actions/Todos/list.action';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import TodoForm from './index';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100%',
    padding: '0 8px',
  },
  addCard: {
    width: '100%',
    backgroundColor: theme.palette.background.card,
    fontFamily: 'Poppins, sans-serif',
    '&.MuiButton-root:hover': {
      background: theme.palette.background.card,
      cursor: 'pointer',
    },
    '& .MuiButton-label > i': {
      marginRight: theme.spacing(1),
      fontSize: theme.spacing(1.8),
    },
  },
  btnAddCard: {
    fontSize: '1.2rem',
    height: '32px',
    color: '#fff',

    '.MuiButton-contained:hover': {
      boxShadow: 0,
      backgroundColor: '#0265E5!important',
      opacity: 0.86,
    },
  },
}));

export default function TodoFormContainer({ isLists, listId }) {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [open, setOpen] = useState(false);
  const label = isLists ? translate('add_list') : translate('add_card');
  const placeholder = isLists ? translate('enter_title_list') : translate('enter_title_card');
  const userId = useSelector(state => state.user.currentUser);

  const handleCloseForm = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAddList = async data => {
    if (data.title === '') return;
    const newList = { title: data.title, cards: [] };

    await dispatch(listActions.asyncAddTodoList(boardId, newList));
    await dispatch(
      activityActions.asyncCreateNewActivity({
        text: `${userId.username} added ${newList.title} to this board`,
        boardId: boardId,
      }),
    );
    setOpen(false);
  };

  const handleAddCard = data => {
    if (data.title === '') return;

    const newCards = {
      title: data.title,
      list: listId,
      userId: userId._id,
      boardId,
    };
    dispatch(cardActions.asyncAddTodoCard(newCards));
    dispatch(
      activityActions.asyncCreateNewActivity({
        text: `${userId.username} added ${newCards.title} task to this list`,
        boardId: boardId,
      }),
    );
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <TodoForm
          onCloseForm={handleCloseForm}
          text=""
          name="title"
          placeholder={placeholder}
          label={label}
          submit={isLists ? handleAddList : handleAddCard}
        />
      </Collapse>
      <Collapse in={!open}>
        <Button disableRipple className={classes.addCard} onClick={() => setOpen(!open)}>
          <i className="bx bx-plus"></i>
          <Typography variant="h6" component="h6" color="textPrimary">
            {label}
          </Typography>
        </Button>
      </Collapse>
    </div>
  );
}
