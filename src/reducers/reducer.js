import { combineReducers } from "redux";
import { userReducer } from "./Auth";
import { todosReducer } from "./Todos";
import { appReducer } from "./App";
import { socketReducer } from "./Socket";
import { notifyReducer } from "./Notification";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  todo: todosReducer,
  socket: socketReducer,
  notifications: notifyReducer
});

export default rootReducer;
