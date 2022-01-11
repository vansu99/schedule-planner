import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { boardActions } from 'actions/Todos/board.action';
import { cardActions } from 'actions/Todos/card.action';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './UserCard.style';

function UserCard({ user, cardId, boardId, isProject }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddMemberTodo = useCallback(() => {
    dispatch(cardActions.asyncAddMemberTodoCard(cardId, user._id));
  }, [user, dispatch]);

  const handleAddMemberProject = () => {
    const memberInfo = {
      id: user._id,
      name: user.username,
      completed: [],
      failed: [],
    };
    dispatch(boardActions.asyncAddMemberProject(boardId, user._id, memberInfo));
  };

  return (
    <ListItem divider disableGutters className={classes.userItem}>
      <ListItemAvatar style={{ minWidth: '4rem' }}>
        <Avatar
          src={user.image}
          alt={user.username}
          className={classes.userAvatar}
        />
      </ListItemAvatar>
      <ListItemText primary={user.username} />
      <ListItemSecondaryAction className={classes.userAction}>
        <IconButton
          disableRipple
          onClick={isProject ? handleAddMemberProject : handleAddMemberTodo}
        >
          <AddBoxIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

UserCard.propTypes = {
  user: PropTypes.object,
  cardId: PropTypes.string,
};

export default UserCard;
