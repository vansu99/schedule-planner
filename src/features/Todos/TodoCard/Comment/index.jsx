import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import useStyles from '../theme.todoCard';
import { getCards } from 'selectors/todos.selector';
import { useSelector } from 'react-redux';

function Comments({ cardId }) {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const [showComment, setShowComment] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);
  const card = useSelector(getCards);
  const commentss = card[cardId].comments;

  useEffect(() => {
    const newCm = commentss.filter(cm => !cm.reply);
    setShowComment(newCm.slice(newCm.length - next));
  }, [commentss, next]);

  useEffect(() => {
    const newRep = commentss.filter(cmt => cmt.reply);
    setReplyComments(newRep);
  }, [commentss]);

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
          <div className="todoCard-details__comments-reply">
            {replyComments.map(
              (cmt, index) =>
                cmt.reply === comment?.id && <CommentCard key={index} comment={cmt} commentId={comment._id} />,
            )}
          </div>
        </CommentCard>
      ))}
      {commentss.length - next > 0 ? (
        <span className="todoCard-details__comments-more" onClick={() => setNext(prev => prev + 10)}>
          {translate('see_more_cmt')}
        </span>
      ) : (
        commentss.length > 2 && (
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
