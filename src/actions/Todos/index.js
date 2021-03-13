import { todoActions } from "configs";
import { actShowLoading, actHideLoading } from "../Global";
import { listsApis, columnsApis, todosApis } from "apis";
import showToast from "components/Toast";

// CARDS
const actGetALlCardTodo = cardss => {
  return {
    type: todoActions.GET_CARDS,
    payload: { cardss }
  };
};

const asyncGetAllCardTodo = () => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await todosApis.getAllCardTodo();
      const response = result.data?.cards.reduce((acc, cur) => {
        acc[cur._id] = cur;
        return acc;
      }, {});
      if (result.status === 200) {
        dispatch(actGetALlCardTodo(response));
        dispatch(actHideLoading());
      }
    } catch (error) {
      throw error;
    }
  };
};

const actAddTodoCard = (listID, card) => {
  return {
    type: todoActions.ADD_CARD,
    payload: { listID, card }
  };
};

const asyncAddTodoCard = todo => {
  return async dispatch => {
    try {
      const { list } = todo;
      const result = await todosApis.createCardTodo(todo);
      const cardId = result.data.card?._id;
      if (result.status === 201) {
        dispatch(actAddTodoCard(list, result.data.card));
        await listsApis.addCardIdToList(list, cardId);
      }
    } catch (error) {
      console.log("error action: ", error);
    }
  };
};

const actRemoveTodoCard = (listId, cardId) => {
  return {
    type: todoActions.REMOVE_CARD,
    payload: { listId, cardId }
  };
};

const asyncRemoveTodoCard = (listId, cardId) => {
  return async dispatch => {
    try {
      const result = await todosApis.removeCardTodo(cardId);
      if (result.status === 200) {
        dispatch(actRemoveTodoCard(listId, cardId));
        await listsApis.removeCardIdToList(listId, cardId);
        showToast(result.data.msg, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditTodoCard = (cardId, cardContent) => {
  return {
    type: todoActions.EDIT_CARD,
    payload: { cardId, cardContent }
  };
};

const asyncEditTodoCard = (cardId, title) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, { title });
      if (result.status === 200) dispatch(actEditTodoCard(cardId, result.data.result?.title));
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditDescTodoCard = (cardId, desc) => {
  return {
    type: todoActions.EDIT_DESC_CARD,
    payload: { cardId, desc }
  };
};

const asyncEditDescTodoCard = (cardId, description) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, {
        description
      });
      if (result.status === 200) dispatch(actEditDescTodoCard(cardId, description));
    } catch (error) {
      console.log(error);
    }
  };
};

const actAddCheckListCard = (cardId, checklist) => {
  return {
    type: todoActions.ADD_CHECKLIST_TODO_CARD,
    payload: { cardId, checklist }
  };
};

const asyncAddCheckListCard = (cardId, checklist) => {
  return async dispatch => {
    try {
      const result = await todosApis.addCheckListTodoCard(cardId, checklist);
      if (result.status === 201) dispatch(actAddCheckListCard(cardId, checklist));
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditCheckListTodoCard = (cardId, checklist) => {
  return {
    type: todoActions.EDIT_CHECKLIST_TODO_CARD,
    payload: { cardId, checklist }
  };
};

const asyncEditCheckListTodoCard = (cardId, checklist) => {
  return async dispatch => {
    try {
      const result = await todosApis.updateSingleCardTodo(cardId, {
        checklist
      });
      if (result.status === 200) dispatch(actEditCheckListTodoCard(cardId, checklist));
    } catch (error) {
      console.log(error);
    }
  };
};

const actRemoveCheckListTodoCard = (cardId, checklistId) => {
  return {
    type: todoActions.REMOVE_CHECKLIST_TODO_CARD,
    payload: { cardId, checklistId }
  };
};

const asyncRemoveCheckListTodoCard = (cardId, checklistId) => {
  return async dispatch => {
    try {
      const result = await todosApis.removeCheckListTodoCard(cardId, checklistId);
      if (result.status === 200) {
        showToast(result.data.msg, "success");
        dispatch(actRemoveCheckListTodoCard(cardId, checklistId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// DRAG & DROP
const actDragEndList = payload => {
  return {
    type: todoActions.DRAG_END_LIST,
    payload
  };
};

const asyncDragEndList = result => {
  return async dispatch => {
    try {
      dispatch(actDragEndList(result));
    } catch (error) {
      console.log(error);
    }
  };
};

const actDragEndCard = payload => {
  return {
    type: todoActions.DRAG_END_CARD,
    payload
  };
};

const asyncDragEndCard = result => {
  const { draggableId, destination, source } = result;
  return async dispatch => {
    try {
      const list = destination.droppableId;
      const response = await todosApis.updateSingleCardTodo(draggableId, { list });
      if (response.status === 200) {
        await listsApis.addCardIdToList(list, draggableId);
        await listsApis.removeCardIdToList(source.droppableId, draggableId);
        dispatch(actDragEndCard(result));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// LISTS
const actAddList = payload => {
  return {
    type: todoActions.ADD_LIST,
    payload
  };
};

const asyncAddTodoList = list => {
  return async dispatch => {
    try {
      const result = await listsApis.createListTodo(list);
      const listId = result.data?.list._id;
      if (result.status === 201) {
        dispatch(actAddList(result.data?.list));
        await columnsApis.createColumnTodo({ listId });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actEditTitleList = (listId, title) => {
  return {
    type: todoActions.CHANGE_TITLE_LIST,
    payload: { listId, title }
  };
};

const asyncEditTitleTodoList = (listId, title) => {
  return async dispatch => {
    try {
      const result = await listsApis.changeTitleListTodo(listId, { title });
      if (result.status === 200) dispatch(actEditTitleList(listId, title));
    } catch (error) {
      console.log(error);
    }
  };
};

const actRemoveList = listId => {
  return {
    type: todoActions.REMOVE_LIST,
    payload: { listId }
  };
};

const asyncRemoveTodoList = listId => {
  return async dispatch => {
    try {
      dispatch(actRemoveList(listId));
    } catch (error) {
      console.log(error);
    }
  };
};

const actGetAllTodoList = lists => {
  return {
    type: todoActions.GET_LISTS,
    payload: { lists }
  };
};

const asyncGetAllTodoList = () => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await listsApis.getAllListsTodo();
      const response = result.data?.lists.reduce((acc, cur) => {
        acc[cur._id] = cur;
        return acc;
      }, {});
      if (result.status === 200) {
        dispatch(actGetAllTodoList(response));
        dispatch(actHideLoading());
      }
    } catch (error) {
      throw error;
    }
  };
};

const actGetAllColumns = columns => {
  return {
    type: todoActions.GET_COLUMNS,
    payload: { columns }
  };
};

const asyncGetAllColumns = () => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await columnsApis.getAllColumnListTodo();
      const response = result.data?.columns.reduce((acc, curr) => {
        acc.push(curr.listId);
        return acc;
      }, []);
      if (result.status === 200) {
        dispatch(actGetAllColumns(response));
        dispatch(actHideLoading());
      }
    } catch (error) {
      throw error;
    }
  };
};

// LABELS
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

export const todosActions = {
  asyncGetAllColumns,
  asyncAddTodoList,
  asyncGetAllTodoList,
  asyncEditTitleTodoList,
  asyncEditDescTodoCard,
  asyncEditCheckListTodoCard,
  asyncRemoveCheckListTodoCard,
  asyncAddCheckListCard,
  asyncGetAllCardTodo,
  asyncRemoveTodoList,
  asyncAddTodoCard,
  asyncDragEndList,
  asyncDragEndCard,
  asyncEditTodoCard,
  asyncRemoveTodoCard,
  asyncAddLabelTodo
};
