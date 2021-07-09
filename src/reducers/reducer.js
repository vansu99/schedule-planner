import { combineReducers } from 'redux';
import { userReducer } from './Auth';
import { todosReducer } from './Todos';
import { appReducer } from './App';
import { socketReducer } from './Socket';
import { notifyReducer } from './Notification';
import { calendarReducer } from './Calendar';
import { activityReducer } from './Activity';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  todo: todosReducer,
  socket: socketReducer,
  calendar: calendarReducer,
  activities: activityReducer,
  notifications: notifyReducer,
});

export default rootReducer;
