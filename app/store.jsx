import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
