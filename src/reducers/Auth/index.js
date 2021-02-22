import { UserActionTypes, StorageKeys } from "../../configs";

const initialState = {
  isAuthenticated: false,
  currentUser: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  error: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.ACTION_LOGIN_SUCCESS:
      localStorage.setItem(StorageKeys.TOKEN, action.token);
      return {
        ...state,
        isAuthenticated: true,
      };

    case UserActionTypes.ACTION_USER_LOGOUT:
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        error: null,
      };

    default:
      return state;
  }
}
