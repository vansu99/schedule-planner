import React, { useState } from "react";
import PropTypes from "prop-types";
import { StorageKeys } from "configs";
import "../todoCard.scss";
import { useDispatch } from "react-redux";
import { commentActions } from "actions/Todos/comment.action";

function InputComment({ children, cardId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER));

  const handleSubmitComment = () => {
    if (!content.trim()) return;

    setContent("");
    const newComment = {
      content,
      reply: "",
      user: user._id
    };
    dispatch(commentActions.asyncAddCommentTodoCard(cardId, newComment, user));
  };

  return (
    <div className="todoCard-details__comments-add">
      {children}
      <input type="text" placeholder="Add your comment..." value={content} onChange={e => setContent(e.target.value)} />
      <button className="todoCard-details__comments-button" onClick={handleSubmitComment}>
        Post
      </button>
    </div>
  );
}

InputComment.propTypes = {
  cardId: PropTypes.string
};

export default InputComment;
