import { appConstants } from "../../configs";

const initialState = {
  loading: false,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case appConstants.SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };

    case appConstants.HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
