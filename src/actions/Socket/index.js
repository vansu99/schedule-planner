import { SOCKET } from 'configs';
import { addNotification } from '../Global';
import { connect } from 'services/socketService';

export const connectSocket = () => dispatch => {
  const socket = connect();
  dispatch({ type: SOCKET.CONNECT, payload: socket });

  socket.on('newNotification', data => {
    const notify = {
      sender: data.user,
      read: false,
      _id: Math.floor(Math.random() * 99),
      date: new Date(),
      notificationType: data.type
    }
    dispatch(addNotification(notify));
  });
};

export const disconnectSocket = () => ({
  type: SOCKET.DISCONNECT,
});

