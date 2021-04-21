import { connect } from "services/socketService";
import { SOCKET } from "configs";
import { addNotification } from "../Global"

const connectSocket = () => dispatch => {
  const socket = connect();
  dispatch({ type: SOCKET.CONNECT, payload: socket });

  socket.on("newNotification", data => {
    dispatch(addNotification(data));
  });
};

const disconnectSocket = () => ({
  type: SOCKET.DISCONNECT
});

export const socketActions = {
  connectSocket,
  disconnectSocket
};
