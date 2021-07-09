import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/reducer';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)));

export default store;
