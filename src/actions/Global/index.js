import { appConstants, NOTIFICATIONS } from '../../configs';
import { notificationsApis } from 'apis';

export const actShowLoading = () => {
  return {
    type: appConstants.SHOW_LOADING,
  };
};

export const actHideLoading = () => {
  return {
    type: appConstants.HIDE_LOADING,
  };
};

export const addNotification = notification => ({
  type: NOTIFICATIONS.ADD_NOTIFICATION,
  payload: notification,
});

export const fetchNotificationsStart = () => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATIONS.FETCH_NOTIFICATIONS_START });
      const response = await notificationsApis.retrieveNotifications();
      dispatch({
        type: NOTIFICATIONS.FETCH_NOTIFICATIONS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: NOTIFICATIONS.FETCH_NOTIFICATIONS_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const readNotificationsStart = () => {
  return async dispatch => {
    try {
      dispatch({ type: NOTIFICATIONS.READ_NOTIFICATIONS });
      await notificationsApis.readNotifications();
    } catch (err) {
      console.warn(err.message);
    }
  };
};

export const clearNotifications = () => ({
  type: NOTIFICATIONS.CLEAR_NOTIFICATIONS,
});

export const hideAlert = () => ({
  type: appConstants.HIDE_ALERT,
});

export const showAlert = (text, onClick = null) => (dispatch, getState) => {
  const state = getState();
  clearTimeout(state.alert.timeoutId);
  const timeout = setTimeout(() => {
    dispatch(hideAlert());
    dispatch({ type: appConstants.SET_ALERT_TIMEOUT_ID, payload: null });
  }, 5000);
  dispatch({ type: appConstants.SET_ALERT_TIMEOUT_ID, payload: timeout });

  if (state.alert.showAlert) {
    dispatch(hideAlert());
    setTimeout(() => {
      dispatch({
        type: appConstants.SHOW_ALERT,
        payload: { text, onClick },
      });
    }, 500);
  } else {
    dispatch({
      type: appConstants.SHOW_ALERT,
      payload: { text, onClick },
    });
  }
};

export const setDialog = (isShow, type = 'error', content = '') => ({
  type: appConstants.SHOW_DIALOG,
  payload: {
    dialog: {
      type,
      isShow,
      content,
    },
  },
});
