import history from "../../helpers/history";
import { UserActionTypes, pathName, StorageKeys } from "../../configs";
import { userApis } from "../../apis";

// GET ME
const actGetMeSuccess = (user) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_SUCCESS,
    user,
  };
};

const actGetMeFailure = (error) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_FAILURE,
    error,
  };
};

const asyncGetMe = () => {
  return async (dispatch) => {
    try {
      const response = await userApis.getMe();
      dispatch(actGetMeSuccess(response.data.data));
    } catch (error) {
      dispatch(actGetMeFailure(error));
    }
  };
};

// LOGIN
const actLoginSuccess = (token, userInfo) => {
  return {
    type: UserActionTypes.ACTION_LOGIN_SUCCESS,
    payload: { token, userInfo },
  };
};

const actLoginFailure = (error) => {
  return {
    type: UserActionTypes.ACTION_LOGIN_ERROR,
    error,
  };
};

const asyncLogin = (user) => {
  return async (dispatch) => {
    try {
      const response = await userApis.login(user);
      const token = response.data?.token;
      const userInfo = response.data?.user;
      dispatch(actLoginSuccess(token, userInfo));
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userInfo));
      history.push({ pathname: pathName.ROOT, state: 200 });
    } catch (error) {
      console.log(error);
    }
  };
};

const actLogout = () => {
  return {
    type: UserActionTypes.ACTION_USER_LOGOUT,
  };
};

export const userActions = {
  asyncLogin,
  asyncGetMe,
  actLogout,
};
