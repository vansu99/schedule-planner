import { todoActions } from "../../configs";

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

const asyncRemoveTodoCard = (todo) => {
  return async (dispatch) => {};
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
      console.log(todo);
    } catch (error) {
      console.log(error);
    }
  };
};

export const todosActions = {
  asyncAddTodoCard,
  asyncEditTodoCard,
  asyncRemoveTodoCard,
};
