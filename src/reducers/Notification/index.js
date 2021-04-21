import { NOTIFICATIONS } from "../../configs";

const initialState = {
  notifications: [],
  unreadCount: 0,
  fetching: false,
  error: false
};

export function notifyReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };
    }
    case NOTIFICATIONS.FETCH_NOTIFICATIONS_START: {
      return {
        ...state,
        fetching: true,
        error: false
      };
    }
    case NOTIFICATIONS.FETCH_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    case NOTIFICATIONS.FETCH_NOTIFICATIONS_SUCCESS: {
      const unreadCount = action.payload.filter(notification => notification.read === false).length;
      return {
        ...state,
        fetching: false,
        error: false,
        notifications: action.payload,
        unreadCount
      };
    }
    case NOTIFICATIONS.READ_NOTIFICATIONS: {
      const notifications = JSON.parse(JSON.stringify(state.notifications));
      notifications.forEach(notification => (notification.read = true));
      return {
        ...state,
        unreadCount: 0,
        notifications
      };
    }
    case NOTIFICATIONS.CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        unreadCount: 0,
        notifications: []
      };
    }

    default:
      return state;
  }
}
