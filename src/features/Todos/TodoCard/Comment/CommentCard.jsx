import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "./LikeButton";
import CommentMenu from "./CommentMenu";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "actions/Todos/comment.action";
import { getCurrentUser } from "selectors/auth.selector";

function CommentCard({ comment, cardId }) {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    if (comment.likes.find(like => like === user._id)) {
      setIsLike(true);
    }
  }, [comment]);

  const handleUnLike = () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    dispatch(commentActions.asyncUnLikeCommentTodoCard(cardId, comment, user));
    setLoadLike(false);
  };

  const handleLike = () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    dispatch(commentActions.asyncLikeCommentTodoCard(cardId, comment, user));
    setLoadLike(false);
  };

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(commentActions.asyncUpdateCommentTodoCard(cardId, comment, content, user));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  return (
    <div className="todoCard-details__comments-item">
      <Link to="/" className="todoCard-details__comments-info">
        <img src={comment.user.image} alt={comment.user.username} className="todoCard-details__comments-image" />
        <h6 className="todoCard-details__comments-name">{comment.user.username}</h6>
      </Link>
      <div className="todoCard-details__comments-content">
        <div className="todoCard-details__comments-detail">
          {onEdit ? (
            <TextareaAutosize
              className="todoCard-details__comments-input"
              aria-label="minimum height"
              rowsMin={3}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          ) : (
            <p className="todoCard-details__comments-text">
              {content.length < 100 ? content : readMore ? content + " " : content.slice(0, 100) + "... "}
              {content.length > 100 && (
                <span className="todoCard-details__comments-readMore" onClick={() => setReadMore(!readMore)}>
                  {readMore ? "Ẩn" : "Xem thêm"}
                </span>
              )}
            </p>
          )}
          <span className="todoCard-details__comments-time">{moment(comment.createdAt).fromNow()}</span>
          {onEdit ? (
            <>
              <span onClick={handleUpdate}>Chỉnh sửa</span>
              <span onClick={() => setOnEdit(false)}>Hủy bỏ</span>
            </>
          ) : null}
        </div>

        <div className="todoCard-details__comments-menu">
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
          <CommentMenu comment={comment} setOnEdit={setOnEdit} />
        </div>
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object
};

export default CommentCard;
