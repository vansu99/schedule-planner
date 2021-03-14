import { combineReducers } from "redux";
import { userReducer } from "./Auth";
import { todosReducer } from "./Todos";
import { appReducer } from "./App";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  todo: todosReducer
});

export default rootReducer;
