import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import useStyles from './Comment.style';
import { getCards } from 'selectors/todos.selector';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../selectors/auth.selector';
import { commentActions } from '../../../../actions/Todos/comment.action';

function Comments({ cardId }) {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const [showComment, setShowComment] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);
  const card = useSelector(getCards);
  const socket = useSelector(state => state.socket.socket);
  const commentList = card[cardId].comments;
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  // comment
  useEffect(() => {
    if (socket) {
      setShowComment(commentList.slice(commentList.length - next));
      socket.on('sendComment', msg => {
        const newMsg = {
          ...msg,
          user,
        };
        dispatch(commentActions.actAddCommentTodoCard(msg.cardId, newMsg));
        setShowComment([...showComment, newMsg]);
      });
      return () => socket.off('sendComment');
    }
  }, [commentList, next, socket]);

  // reply comment
  useEffect(() => {
    if (socket) {
      socket.on('sendReplyComment', msg => {
        const newArr = [...commentList];
        newArr.forEach(cm => {
          if (cm._id === msg.id) {
            cm.reply = [...msg.reply];
          }
        });
        dispatch({
          type: 'ADD_REPLY_COMMENT_TODO_CARD',
          payload: { cardId: msg.cardId, comment: { id: msg.id, reply: msg.reply } },
        });
        setReplyComments(newArr);
      });

      return () => socket.off('sendReplyComment');
    }
  }, [commentList, socket]);

  return (
    <Box mt={2.7} mb={3.8}>
      {showComment.map(comment => (
        <CommentCard
          key={comment?._id}
          comment={comment}
          cardId={cardId}
          commentId={comment?._id}
          replyComments={replyComments.filter(item => item.reply === comment?.id)}
        >
          <div className={classes.cmtReply}>
            {replyComments.map((cmt, index) => (
              <div key={index}>
                {cmt.reply.map(
                  rep =>
                    cmt._id === comment._id && (
                      <CommentCard key={rep._id} comment={rep} commentId={comment._id} />
                    ),
                )}
              </div>
            ))}
          </div>
        </CommentCard>
      ))}
      {commentList.length - next > 0 ? (
        <span
          className="todoCard-details__comments-more"
          onClick={() => setNext(prev => prev + 10)}
        >
          {translate('see_more_cmt')}
        </span>
      ) : (
        commentList.length > 2 && (
          <span className="todoCard-details__comments-more" onClick={() => setNext(2)}>
            {translate('hide_more_cmt')}
          </span>
        )
      )}
    </Box>
  );
}

Comments.propTypes = {
  cardId: PropTypes.string,
};

export default Comments;
