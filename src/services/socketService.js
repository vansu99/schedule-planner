import io from "socket.io-client";
import { StorageKeys } from "configs";

export const connect = () => {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  const socket = io("http://localhost:8080", {
    transports: ["websocket", "polling", "flashsocket"],
    query: { token }
  });
  return socket;
};
