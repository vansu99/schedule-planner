import { combineReducers } from "redux";
import { userReducer } from "./Auth";
import { todosReducer } from "./Todos";
import { appReducer } from "./App";
import { socketReducer } from "./Socket";
import { notifyReducer } from "./Notification";
import { calendarReducer } from "./Calendar";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  todo: todosReducer,
  socket: socketReducer,
  calendar: calendarReducer,
  notifications: notifyReducer
});

export default rootReducer;
