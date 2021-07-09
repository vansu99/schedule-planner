import { appConstants } from '../../configs';

const initialState = {
  loading: false,
  text: '',
  onClick: null,
  showAlert: false,
  timeoutId: null,
  dialog: {
    type: 'error',
    isShow: false,
    content: '',
  },
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

    case appConstants.SHOW_ALERT:
      const { text, onClick } = action.payload;
      return { ...state, text, onClick, showAlert: true };

    case appConstants.HIDE_ALERT:
      return { ...state, text: '', onClick: null, showAlert: false };

    case appConstants.SET_ALERT_TIMEOUT_ID:
      return { ...state, timeoutId: action.payload };

    case appConstants.SHOW_DIALOG:
      return {
        ...state,
        dialog: {
          type: action.payload.dialog.type,
          isShow: action.payload.dialog.isShow,
          content: action.payload.dialog.content,
        },
      };

    default:
      return state;
  }
}
