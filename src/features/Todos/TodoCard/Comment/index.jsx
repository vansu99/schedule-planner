import React from "react";
import PropTypes from "prop-types";
import CommentCard from "./CommentCard";

function Comments({ comments = [] }) {
  return (
    <div className="todoCard-details__comments-list">
      {comments.map(comment => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array
};

export default Comments;
