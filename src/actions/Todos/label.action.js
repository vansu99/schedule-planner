import { todosApis } from "apis";
import showToast from "components/Toast";
import { todoActions } from "configs";
import { actShowLoading, actHideLoading } from "../Global";

const actAddLabelTodo = (cardId, label) => {
  return {
    type: todoActions.ADD_LABEL,
    payload: { cardId, label }
  };
};

const asyncAddLabelTodo = (cardId, label) => {
  return async dispatch => {
    try {
      const result = await todosApis.addLabelTodoCard(cardId, label);
      if (result.status === 201) {
        dispatch(actAddLabelTodo(cardId, label));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actRemoveLabelTodoCard = (cardId, labelId) => {
  return {
    type: todoActions.REMOVE_LABEL,
    payload: { cardId, labelId }
  };
};

const asyncRemoveLabelTodo = (cardId, labelId) => {
  return async dispatch => {
    try {
      const result = await todosApis.removeLabelTodoCard(cardId, labelId);
      if (result.status === 200) {
        showToast(result.data.msg, "success");
        dispatch(actRemoveLabelTodoCard(cardId, labelId));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const labelActions = {
  asyncAddLabelTodo,
  asyncRemoveLabelTodo
};
