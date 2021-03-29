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

export const labelActions = {
  asyncAddLabelTodo
};
