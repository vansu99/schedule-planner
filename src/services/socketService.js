import io from 'socket.io-client';
import { StorageKeys } from 'configs';

export const connect = () => {
  // https://projectfinaltodo.herokuapp.com
  // http://localhost:8080
  const token = localStorage.getItem(StorageKeys.TOKEN);
  const socket = io('https://projectfinaltodo.herokuapp.com', {
    transports: ['websocket', 'polling', 'flashsocket'],
    query: { token },
  });
  return socket;
};
