import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export default createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));
