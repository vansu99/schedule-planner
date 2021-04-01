import { boardsApis, userApis } from "apis";
import showToast from "components/Toast";
import { todoActions } from "configs";
import { actShowLoading, actHideLoading } from "../Global";

const actGetAllBoards = boards => {
  return {
    type: todoActions.GET_ALL_BOARDS,
    payload: boards
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
    payload: { columns }
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
    payload: board
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
    payload: board
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
    payload: { lists }
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
    payload: { cardss }
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

export const boardActions = {
  asyncAddBoard,
  asyncGetBoardById,
  asyncGetAllBoards,
  asyncGetCardsFromBoard,
  asyncGetListsFromBoard,
  asyncGetColumnByBoardId
};
