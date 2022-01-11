import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useStyles from './Comment.style';
import LikeButton from './LikeButton';
import CommentMenu from './CommentMenu';
import InputComment from './InputComment';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from 'actions/Todos/comment.action';
import { getCurrentUser } from 'selectors/auth.selector';
import { Box, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

function CommentCard({
  children,
  comment,
  cardId,
  commentId,
  replyComments = {},
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const socket = useSelector((state) => state.socket.socket);
  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [reply, setReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setReply(false);
    if (comment.likes?.find((like) => like === user?._id)) {
      setIsLike(true);
    }
  }, [comment]);

  const handleUnLike = () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    dispatch(
      commentActions.asyncUnLikeCommentTodoCard(cardId, comment, user, socket)
    );
    setLoadLike(false);
  };

  const handleLike = () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    dispatch(
      commentActions.asyncLikeCommentTodoCard(cardId, comment, user, socket)
    );
    setLoadLike(false);
  };

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(
        commentActions.asyncUpdateCommentTodoCard(
          cardId,
          comment,
          content,
          user
        )
      );
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleReply = () => {
    if (reply) return setReply(false);
    setReply({ ...comment, commentId });
  };

  return (
    <div className={classes.cmtWrapper}>
      <Box component={Link} to="/" display="flex" alignItems="center">
        <Avatar
          src={comment.user?.image}
          alt={comment.user?.username}
          style={{ width: '3rem', height: '3rem', marginRight: '1.2rem' }}
        />
        <Typography
          variant="subtitle1"
          component="h5"
          className={classes.cmtUserName}
        >
          {comment.user?.username}
        </Typography>
      </Box>
      <div className={classes.cmtContent}>
        <div className={classes.cmtDetail}>
          {onEdit ? (
            <TextareaAutosize
              className="todoCard-details__comments-input"
              aria-label="minimum height"
              rowsMin={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <p className={classes.cmtText}>
              {content?.length < 100
                ? content
                : readMore
                ? content + ' '
                : content?.slice(0, 100) + '... '}
              {content?.length > 100 && (
                <span
                  className="todoCard-details__comments-readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? 'Ẩn' : 'Xem thêm'}
                </span>
              )}
            </p>
          )}
          <div className={classes.cmtTimetamps}>
            <span className="todoCard-details__comments-time">
              {moment(comment?.createdAt).fromNow()}
            </span>
            {onEdit ? (
              <>
                <span onClick={handleUpdate}>Chỉnh sửa</span>
                <span onClick={() => setOnEdit(false)}>Hủy bỏ</span>
              </>
            ) : (
              <>
                <span className={classes.cmtText}>
                  {comment.likes?.length} likes
                </span>
                <span className={classes.cmtReplyText} onClick={handleReply}>
                  {reply ? 'Cancel' : 'Reply'}
                </span>
              </>
            )}
          </div>
        </div>

        <div className={classes.cmtActions}>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <CommentMenu
            comment={comment}
            setOnEdit={setOnEdit}
            cardId={cardId}
          />
        </div>
      </div>
      {reply && (
        <InputComment cardId={cardId} reply={reply} setReply={setReply}>
          <Link to={`/users/${reply.user?._id}`}>
            @{reply.user?.username}:{' '}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
}

CommentCard.propTypes = {
  commentId: PropTypes.string,
  replyComments: PropTypes.array,
};

export default CommentCard;
