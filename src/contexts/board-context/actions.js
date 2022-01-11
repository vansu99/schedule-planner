import { todoActions } from 'configs';

export const getAllBoard = () => ({
  type: todoActions.GET_ALL_BOARDS,
});

export const getBoardById = (id) => ({
  type: todoActions.GET_BOARD_BY_ID,
  id,
});
