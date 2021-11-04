import { makeStyles } from '@material-ui/core/styles';
import { commentActions } from 'actions/Todos/comment.action';
import { StorageKeys } from 'configs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  commentInput: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    border: '1px solid #d1d1d1',
    paddingLeft: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    overflow: 'hidden',

    '& > input': {
      backgroundColor: ' #f7f7f7',
      border: 'none',
      outline: 'none',
      flex: 1,
      overflow: 'auto',
      padding: '1rem',
      color: '#000',
    },
    '& > button': {
      padding: '1rem',
      border: 0,
      outline: 'none',
      backgroundColor: '#f7f7f7',
      color: '#333',
      fontWeight: 600,
      fontSize: '1.4rem',
    },
  },
}));

function InputComment({ children, cardId, reply = {}, setReply }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER));

  const handleSubmitComment = () => {
    if (!content.trim()) {
      return;
    }

    setContent('');
    const newComment = {
      content,
      reply: reply && reply.commentId,
      user: user._id,
      tag: reply && reply.user,
    };
    dispatch(commentActions.asyncAddCommentTodoCard(cardId, newComment, user));
    if (setReply) return setReply(false);
  };

  return (
    <div className={classes.commentInput}>
      {children}
      <input
        type="text"
        placeholder="Add your comment..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleSubmitComment}>Post</button>
    </div>
  );
}

InputComment.propTypes = {
  cardId: PropTypes.string,
  reply: PropTypes.object,
};

export default InputComment;
