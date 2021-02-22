import { combineReducers } from "redux";
import { userReducer } from "./Auth";
import { todosReducer } from "./Todos";

const rootReducer = combineReducers({
  user: userReducer,
  todo: todosReducer,
});

export default rootReducer;
