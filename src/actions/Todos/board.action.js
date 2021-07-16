import { boardsApis, userApis, completedTodoApis } from 'apis';
import showToast from 'components/Toast';
import { todoActions } from 'configs';
import { actShowLoading, actHideLoading } from '../Global';

const actGetAllBoards = boards => {
  return {
    type: todoActions.GET_ALL_BOARDS,
    payload: boards,
  };
};

const asyncGetAllBoards = () => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await boardsApis.getAllBoardsTodo();
      if (result.status === 200) {
        dispatch(actGetAllBoards(result.data.boards));
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

const actGetColumnByBoardId = columns => {
  return {
    type: todoActions.GET_COLUMNS,
    payload: { columns },
  };
};

const asyncGetColumnByBoardId = id => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await boardsApis.getColumnsFromBoard(id);
      if (result.status === 200) {
        const columnId = result.data.columns;
        dispatch(actGetColumnByBoardId(columnId));
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

const actAddBoard = board => {
  return {
    type: todoActions.ADD_BOARDS,
    payload: board,
  };
};

const asyncAddBoard = (userId, title) => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await boardsApis.createBoardTodo({ userId, title });
      const boardId = result.data.board._id;
      if (result.status === 201) {
        dispatch(actAddBoard(result.data.board));
        await userApis.addBoardIdToUser(userId, boardId);
        await completedTodoApis.createReportTodo(boardId);
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

const actGetBoardById = board => {
  return {
    type: todoActions.GET_BOARD_BY_ID,
    payload: board,
  };
};

const asyncGetBoardById = ids => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await boardsApis.getBoardById(ids);
      if (result.status === 200) {
        dispatch(actGetBoardById(result.data.board));
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

const actGetListsFromBoard = lists => {
  return {
    type: todoActions.GET_LISTS,
    payload: { lists },
  };
};

const asyncGetListsFromBoard = id => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await boardsApis.getListsFromBoard(id);
      const response = result.data?.lists.reduce((acc, cur) => {
        acc[cur._id] = cur;
        return acc;
      }, {});
      if (result.status === 200) {
        dispatch(actGetListsFromBoard(response));
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

const actGetCardsFromBoard = cardss => {
  return {
    type: todoActions.GET_CARDS,
    payload: { cardss },
  };
};

const asyncGetCardsFromBoard = id => {
  return async dispatch => {
    try {
      dispatch(actShowLoading());
      const result = await boardsApis.getCardsFromBoard(id);
      const response = result.data?.cards.reduce((acc, cur) => {
        acc[cur._id] = cur;
        return acc;
      }, {});
      if (result.status === 200) {
        dispatch(actGetCardsFromBoard(response));
        dispatch(actHideLoading());
      }
    } catch (error) {
      dispatch(actHideLoading());
      console.log(error);
    }
  };
};

const actRemoveBoardById = boardId => {
  return {
    type: todoActions.REMOVE_BOARDS,
    payload: { boardId },
  };
};

const asyncRemoveBoardById = boardId => {
  return async dispatch => {
    try {
      const result = await boardsApis.removeBoardById(boardId);
      if (result.status === 200) {
        dispatch(actRemoveBoardById(boardId));
        showToast(result.data.msg, 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncGetActivity = (boardId, last, limit) => {
  return async dispatch => {
    let params = '';
    if (last) params += `&last=${last}`;
    if (limit) params += `&limit=${limit || 10}`;
    try {
      const result = await boardsApis.getActivityFromBoard(boardId);
      if (result.status === 200) {
        dispatch({
          type: todoActions.GET_ACTIVITIES,
          payload: {
            activities: result.data,
            hasMore: result.headers['x-has-more'] === true,
            add: !!last,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const asyncUpdateTitleBoardById = data => {
  return async dispatch => {
    try {
      const result = await boardsApis.updateBoardById(data.id, {
        title: data.value,
        slug: data.value.split(' ').join('-'),
      });
      if (result.status === 200) {
        dispatch({
          type: todoActions.UPDATE_BOARDS,
          payload: { board: result.data.board },
        });
      }
    } catch (error) {
      dispatch({
        type: todoActions.UPDATE_BOARD_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};
const asyncUpdateDueDateBoardById = data => {
  return async dispatch => {
    try {
      const result = await boardsApis.updateBoardById(data.id, {
        duedate: data.duedate,
      });
      if (result.status === 200) {
        dispatch({
          type: todoActions.UPDATE_BOARDS,
          payload: { board: result.data.board },
        });
      }
    } catch (error) {
      dispatch({
        type: todoActions.UPDATE_BOARD_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

const asyncUpdateColorBoardById = data => {
  return async dispatch => {
    try {
      const result = await boardsApis.updateBoardById(data._id, {
        image: data.colorBoard,
      });
      if (result.status === 200) {
        dispatch({
          type: todoActions.UPDATE_BOARDS,
          payload: { board: result.data.board },
        });
      }
    } catch (error) {
      dispatch({
        type: todoActions.UPDATE_BOARD_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const boardActions = {
  asyncAddBoard,
  asyncGetActivity,
  asyncGetBoardById,
  asyncGetAllBoards,
  asyncUpdateDueDateBoardById,
  asyncUpdateColorBoardById,
  asyncUpdateTitleBoardById,
  asyncRemoveBoardById,
  asyncGetCardsFromBoard,
  asyncGetListsFromBoard,
  asyncGetColumnByBoardId,
};
