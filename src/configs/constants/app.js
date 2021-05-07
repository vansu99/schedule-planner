const appConstants = {
  SHOW_LOADING: "SHOW_LOADING",
  HIDE_LOADING: "HIDE_LOADING",
  SET_MODE_THEME: "SET_MODE_THEME",
  SET_LANGUAGE: "SET_LANGUAGE"
};

const LANGUAGE = {
  ENGLISH: "en",
  VIETNAMESE: "vn"
};

const THEMES = {
  LIGHT: "light",
  DARK: "dark"
};

const SOCKET = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT"
};

const NOTIFICATIONS = {
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  FETCH_NOTIFICATIONS_START: "FETCH_NOTIFICATIONS_START",
  FETCH_NOTIFICATIONS_SUCCESS: "FETCH_NOTIFICATIONS_SUCCESS",
  FETCH_NOTIFICATIONS_FAILURE: "FETCH_NOTIFICATIONS_FAILURE",
  READ_NOTIFICATIONS: "READ_NOTIFICATIONS",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS"
};

export { appConstants, LANGUAGE, THEMES, SOCKET, NOTIFICATIONS };
