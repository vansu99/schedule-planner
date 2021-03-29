import React from "react";
import PropTypes from "prop-types";
import "./userCard.scss";
import { cardActions } from "actions/Todos/card.action";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

function UserCard({ user, cardId }) {
  const dispatch = useDispatch();
  const handleAddMemberTodo = useCallback(() => {
    dispatch(cardActions.asyncAddMemberTodoCard(cardId, user._id));
  }, [user, dispatch]);

  return (
    <div className="user-card">
      <img src={user.image} alt="avatar" className="user-card-image" />
      <span className="user-card-title">{user.username}</span>
      <button onClick={handleAddMemberTodo}>
        <i className="bx bx-plus user-card-icon"></i>
      </button>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object,
  cardId: PropTypes.string
};

export default UserCard;
