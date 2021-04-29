import { todoActions } from "configs";

const inititalState = {
  open: false
};

export function calendarReducer(state = inititalState, action) {
  switch (action.type) {
    case todoActions.OPEN_EVENT_FORM:
      return {
        ...state,
        open: true
      };

    case todoActions.CLOSE_EVENT_FORM:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
