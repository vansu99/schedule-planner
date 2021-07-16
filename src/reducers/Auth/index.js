import { UserActionTypes, StorageKeys } from '../../configs';

const initialState = {
  isAuthenticated: false,
  currentUser: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
  error: null,
  fetchingAvatar: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.ACTION_LOGIN_SUCCESS:
      const { token, userInfo } = action.payload;
      localStorage.setItem(StorageKeys.TOKEN, token);
      return {
        ...state,
        isAuthenticated: true,
        currentUser: userInfo,
      };

    case UserActionTypes.ACTION_USER_LOGOUT:
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
      localStorage.removeItem(StorageKeys.USER);
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        error: null,
      };

    case UserActionTypes.SET_CURRENT_USER_SUCCESS:
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        currentUser: user,
      };

    case UserActionTypes.ACTION_UPDATE_USER_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: { ...action.payload.user },
      };

    case UserActionTypes.CHANGE_AVATAR_START:
      return { ...state, fetchingAvatar: true };

    case UserActionTypes.CHANGE_AVATAR_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, image: action.payload },
        fetchingAvatar: false,
      };

    case UserActionTypes.CHANGE_AVATAR_FAILURE:
      return {
        ...state,
        fetchingAvatar: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
