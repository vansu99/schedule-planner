import { todoActions } from "../../configs";

// CARDS
const actAddTodoCard = (listID, card) => {
  return {
    type: todoActions.ADD_CARD,
    payload: { listID, card },
  };
};

const asyncAddTodoCard = (todo) => {
  return async (dispatch) => {
    try {
      //console.log("test action ", todo);
      const { list } = todo;
      dispatch(actAddTodoCard(list, todo));
    } catch (error) {
      console.log("error action: ", error);
    }
  };
};

const actRemoveTodoCard = (listId, cardId) => {
  return {
    type: todoActions.REMOVE_CARD,
    payload: { listId, cardId },
  };
};

const asyncRemoveTodoCard = (listId, cardId) => {
  return async (dispatch) => {
    try {
      dispatch(actRemoveTodoCard(listId, cardId));
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditTodoCard = (cardId, cardContent) => {
  return {
    type: todoActions.EDIT_CARD,
    payload: { cardId, cardContent },
  };
};

const asyncEditTodoCard = (cardId, todo) => {
  return async (dispatch) => {
    try {
      dispatch(actEditTodoCard(cardId, todo));
    } catch (error) {
      console.log(error);
    }
  };
};

const actDragEndList = (payload) => {
  return {
    type: todoActions.DRAG_END_LIST,
    payload,
  };
};

const asyncDragEndList = (result) => {
  return async (dispatch) => {
    try {
      dispatch(actDragEndList(result));
    } catch (error) {
      console.log(error);
    }
  };
};

const actDragEndCard = (payload) => {
  return {
    type: todoActions.DRAG_END_CARD,
    payload,
  };
};

const asyncDragEndCard = (result) => {
  return async (dispatch) => {
    try {
      dispatch(actDragEndCard(result));
    } catch (error) {
      console.log(error);
    }
  };
};

// LISTS
const actAddList = (payload) => {
  return {
    type: todoActions.ADD_LIST,
    payload,
  };
};

const asyncAddTodoList = (list) => {
  return async (dispatch) => {
    try {
      dispatch(actAddList(list));
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditTitleList = (listId, title) => {
  return {
    type: todoActions.CHANGE_TITLE_LIST,
    payload: { listId, title },
  };
};

const asyncEditTitleTodoList = (listId, title) => {
  return async (dispatch) => {
    try {
      dispatch(actEditTitleList(listId, title));
    } catch (error) {
      console.log(error);
    }
  };
};

const actRemoveList = (listId) => {
  return {
    type: todoActions.REMOVE_LIST,
    payload: { listId },
  };
};

const asyncRemoveTodoList = (listId) => {
  return async (dispatch) => {
    try {
      dispatch(actRemoveList(listId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const todosActions = {
  asyncAddTodoList,
  asyncEditTitleTodoList,
  asyncRemoveTodoList,
  asyncAddTodoCard,
  asyncDragEndList,
  asyncDragEndCard,
  asyncEditTodoCard,
  asyncRemoveTodoCard,
};
