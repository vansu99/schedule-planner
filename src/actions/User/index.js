import { userApis } from 'apis';
import showToast from 'components/Toast';
import { StorageKeys, UserActionTypes } from 'configs';
import history from 'helpers/history';

// GET ME
const actGetMeSuccess = user => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_SUCCESS,
    payload: { user },
  };
};

const actGetMeFailure = error => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_FAILURE,
    error,
  };
};

const asyncGetMe = () => {
  return async dispatch => {
    try {
      const response = await userApis.getMe();
      dispatch(actGetMeSuccess(response.data.user));
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

const actLoginFailure = error => {
  return {
    type: UserActionTypes.ACTION_LOGIN_ERROR,
    error,
  };
};

const asyncLogin = user => {
  return async dispatch => {
    try {
      const response = await userApis.login(user);
      const token = response.data?.token;
      const userInfo = response.data?.user;
      dispatch(actLoginSuccess(token, userInfo));
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userInfo));
      history.push({ pathname: `/users/${userInfo?._id}`, state: 200 });
    } catch (error) {
      showToast(error.response.data?.msg, 'error');
      dispatch(actLoginFailure(error.response.data?.msg));
    }
  };
};

const asyncRegister = user => {
  return async dispatch => {
    try {
      const response = await userApis.register(user);
      const token = response.data?.token;
      const userInfo = response.data?.user;
      dispatch(actLoginSuccess(token, userInfo));
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userInfo));
      history.push({ pathname: `/users/${userInfo?._id}`, state: 200 });
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

// UPDATE USER PROFILE
const actUpdateUserProfile = user => {
  return {
    type: UserActionTypes.ACTION_UPDATE_USER_PROFILE,
    payload: { user },
  };
};

const asyncUpdateUserProfile = (id, user) => {
  return async dispatch => {
    try {
      const result = await userApis.updateUserProfile(id, user);
      if (result.status === 200) {
        dispatch(actUpdateUserProfile(result.data.user));
        showToast('Cập nhật thành công.', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const changeAvatarStart = formData => async dispatch => {
  try {
    dispatch({ type: UserActionTypes.CHANGE_AVATAR_START });
    const response = await userApis.changeAvatar(formData);
    dispatch({
      type: UserActionTypes.CHANGE_AVATAR_SUCCESS,
      payload: response.data.image,
    });
  } catch (err) {
    dispatch({
      type: UserActionTypes.CHANGE_AVATAR_FAILURE,
      payload: err.message,
    });
  }
};

const removeAvatarStart = () => async dispatch => {
  try {
    dispatch({ type: UserActionTypes.REMOVE_AVATAR_START });
    await userApis.removeAvatar();
    dispatch({ type: UserActionTypes.REMOVE_AVATAR_SUCCESS });
  } catch (err) {
    dispatch({ type: UserActionTypes.REMOVE_AVATAR_FAILURE, payload: err.message });
  }
};

export const userActions = {
  asyncRegister,
  removeAvatarStart,
  changeAvatarStart,
  asyncLogin,
  actLoginSuccess,
  asyncGetMe,
  actLogout,
  asyncUpdateUserProfile,
};
