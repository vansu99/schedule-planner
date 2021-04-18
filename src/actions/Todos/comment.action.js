import { todosApis } from "apis";
import showToast from "components/Toast";
import { todoActions } from "configs";
import { actShowLoading, actHideLoading } from "../Global";

const actAddCommentTodoCard = (cardId, comment) => {
  return {
    type: todoActions.ADD_COMMENT_TODO_CARD,
    payload: { cardId, comment }
  };
};

const asyncAddCommentTodoCard = (cardId, newComment, user) => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const data = { ...newComment, cardId };
      const result = await todosApis.addCommentTodoCard(data);
      const newData = { ...result.data.newComment, user: user };
      if (result.status === 200) {
        dispatch(actAddCommentTodoCard(cardId, newData));
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

const actUpdateCommentTodoCard = (cardId, newUpdateComment, user) => {
  return {
    type: todoActions.UPDATE_COMMENT_TODO_CARD,
    payload: { cardId, newUpdateComment, user }
  };
};

const asyncUpdateCommentTodoCard = (cardId, comment, content, user) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateCommentTodoCard(comment._id, { content });
      if (result.status === 200) {
        dispatch(actUpdateCommentTodoCard(cardId, result.data.comment, user));
        showToast(result.data.msg, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actLikeCommentTodoCard = (cardId, comment) => {
  return {
    type: todoActions.LIKE_COMMENT_TODO_CARD,
    payload: { cardId, comment }
  };
};

const asyncLikeCommentTodoCard = (cardId, comment, user) => {
  return async dispatch => {
    //const newComment = { ...comment, likes: [...comment.likes, user] };
    try {
      const result = await todosApis.likeCommentTodoCard(comment._id, user);
      if (result.status === 200) {
        dispatch(actLikeCommentTodoCard(cardId, result.data.likeComment));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actUnLikeCommentTodoCard = (cardId, comment) => {
  return {
    type: todoActions.UNLIKE_COMMENT_TODO_CARD,
    payload: { cardId, comment }
  };
};

const asyncUnLikeCommentTodoCard = (cardId, comment, user) => {
  return async dispatch => {
    try {
      const result = await todosApis.unLikeCommentTodoCard(comment._id, user);
      if (result.status === 200) {
        dispatch(actUnLikeCommentTodoCard(cardId, result.data.unLikeComment));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actRemoveComment = (comment, cardId) => {
  return {
    type: todoActions.REMOVE_COMMENT_TODO_CARD,
    payload: { comment, cardId }
  };
};

const asyncRemoveComment = (commentId, cardId) => {
  return async dispatch => {
    try {
      const removeComment = await todosApis.removeCommentTodoCard(commentId);
      if (removeComment.status === 200) {
        dispatch(actRemoveComment(commentId, cardId));
        showToast(removeComment.data.msg, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const commentActions = {
  asyncRemoveComment,
  asyncAddCommentTodoCard,
  asyncLikeCommentTodoCard,
  asyncUnLikeCommentTodoCard,
  asyncUpdateCommentTodoCard
};
