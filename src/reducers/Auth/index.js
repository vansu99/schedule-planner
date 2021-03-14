import { UserActionTypes, StorageKeys } from "../../configs";

const initialState = {
  isAuthenticated: false,
  currentUser: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  error: null
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.ACTION_LOGIN_SUCCESS:
      const { token, userInfo } = action.payload;
      localStorage.setItem(StorageKeys.TOKEN, token);
      return {
        ...state,
        isAuthenticated: true,
        currentUser: userInfo
      };

    case UserActionTypes.ACTION_USER_LOGOUT:
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.DARK_MODE);
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        error: null
      };

    default:
      return state;
  }
}
