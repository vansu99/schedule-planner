import { SOCKET } from "configs";

const initialState = {
  socket: null
};

export function socketReducer(state = initialState, action) {
  switch (action.type) {
    case SOCKET.CONNECT:
      return {
        ...state,
        socket: action.payload
      };
    case SOCKET.DISCONNECT:
      state.socket && state.socket.disconnect();
      return initialState;

    default:
      return state;
  }
}
