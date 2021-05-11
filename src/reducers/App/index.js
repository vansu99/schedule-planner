import { appConstants } from "../../configs";

const initialState = {
  loading: false,
  text: "",
  onClick: null,
  showAlert: false,
  timeoutId: null
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case appConstants.SHOW_LOADING:
      return {
        ...state,
        loading: true
      };

    case appConstants.HIDE_LOADING:
      return {
        ...state,
        loading: false
      };

    case appConstants.SHOW_ALERT:
      const { text, onClick } = action.payload;
      return { ...state, text, onClick, showAlert: true };

    case appConstants.HIDE_ALERT:
      return { ...state, text: "", onClick: null, showAlert: false };

    case appConstants.SET_ALERT_TIMEOUT_ID:
      return { ...state, timeoutId: action.payload };

    default:
      return state;
  }
}
