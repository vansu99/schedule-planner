import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CommentCard from "./CommentCard";
import { useTranslation } from "react-i18next";

function Comments({ comments = [], cardId }) {
  const { t: translate } = useTranslation();
  const [showComment, setShowComment] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = comments.filter(cm => !cm.reply);
    setShowComment(newCm.slice(newCm.length - next));
  }, [comments, next]);

  useEffect(() => {
    const newRep = comments.filter(cmt => cmt.reply);
    setReplyComments(newRep);
  }, [comments]);

  return (
    <div className="todoCard-details__comments-list">
      {showComment.map(comment => (
        <CommentCard
          key={comment._id}
          comment={comment}
          cardId={cardId}
          commentId={comment._id}
          replyComments={replyComments.filter(item => item.reply === comment.id)}
        >
          <div className="todoCard-details__comments-reply">
            {replyComments.map(
              (cmt, index) =>
                cmt.reply === comment.id && <CommentCard key={index} comment={cmt} commentId={comment._id} />
            )}
          </div>
        </CommentCard>
      ))}
      {comments.length - next > 0 ? (
        <span className="todoCard-details__comments-more" onClick={() => setNext(prev => prev + 10)}>
          {translate("see_more_cmt")}
        </span>
      ) : (
        comments.length > 2 && (
          <span className="todoCard-details__comments-more" onClick={() => setNext(2)}>
            {translate("hide_more_cmt")}
          </span>
        )
      )}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  cardId: PropTypes.string
};

export default Comments;
