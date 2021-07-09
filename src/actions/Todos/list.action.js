import { listsApis, columnsApis, boardsApis } from 'apis';
import showToast from 'components/Toast';
import { todoActions } from 'configs';
import { actShowLoading, actHideLoading } from '../Global';

const actAddList = (list, columnId) => {
  return {
    type: todoActions.ADD_LIST,
    payload: { list, columnId },
  };
};

const asyncAddTodoList = (boardId, list) => {
  return async dispatch => {
    try {
      const result = await listsApis.createListTodo({ ...list, boardId });
      const listId = result.data?.list._id;
      if (result.status === 201) {
        const resultColumn = await columnsApis.createColumnTodo({ listId, boardId });
        const columnId = resultColumn.data.column._id;
        dispatch(actAddList(result.data?.list, columnId));
        await boardsApis.addColumnIdTodo(boardId, columnId);
      }
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
    payload: { listId },
  };
};

const asyncRemoveTodoList = (boardId, listId, columnId) => {
  return async dispatch => {
    try {
      const result = await listsApis.removeListById(listId);
      if (result.status === 200) {
        showToast(result.data.msg, 'success');
        await boardsApis.removeColumnIdBoardById(boardId, columnId);
        await columnsApis.removeListIdTodo(columnId);
        dispatch(actRemoveList(listId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const actGetAllTodoList = lists => {
  return {
    type: todoActions.GET_LISTS,
    payload: { lists },
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

export const listActions = {
  asyncAddTodoList,
  asyncRemoveTodoList,
  asyncGetAllTodoList,
  asyncEditTitleTodoList,
};
