import { todoActions } from "configs";

export const reducer = (state, action) => {
  switch (action.type) {
    case todoActions.GET_BOARD_BY_ID:
      return {
        boards: action.id
      };
    default:
      break;
  }
};
