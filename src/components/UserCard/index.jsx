import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { cardActions } from "actions/Todos/card.action";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

function UserCard({ user, cardId }) {
  const dispatch = useDispatch();

  const handleAddMemberTodo = useCallback(() => {
    dispatch(cardActions.asyncAddMemberTodoCard(cardId, user._id));
  }, [user, dispatch]);

  return (
    <ListItem divider disableGutters>
      <ListItemAvatar>
        <Avatar src={user.image} />
      </ListItemAvatar>
      <ListItemText primary={user.username} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleAddMemberTodo}>
          <AddBoxIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

UserCard.propTypes = {
  user: PropTypes.object,
  cardId: PropTypes.string
};

export default UserCard;
