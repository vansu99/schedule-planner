import { todoActions } from "../../configs";

const actAddTodoCard = (listId, card) => {
  return {
    type: todoActions.ADD_CARD,
    payload: { listId, card },
  };
};

const asyncAddTodoCard = (todo) => {
  return async (dispatch) => {};
};

const actRemoveTodoCard = (listId, cardId) => {
  return {
    type: todoActions.REMOVE_CARD,
    payload: { listId, cardId },
  };
};

const asyncRemoveTodoCard = (todo) => {
  return async (dispatch) => {};
};

const actEditTodoCard = (cardId, cardText) => {
  return {
    type: todoActions.EDIT_CARD,
    payload: { cardId, cardText },
  };
};

const asyncEditTodoCard = (todo) => {
  return async (dispatch) => {};
};

export const todosActions = {
  asyncAddTodoCard,
  asyncEditTodoCard,
  asyncRemoveTodoCard,
};
