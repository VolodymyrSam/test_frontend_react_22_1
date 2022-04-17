import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './_reducers';
import { allConstants } from './_constants/all_constants.constants';

const loggerMiddleware = createLogger({
	predicate: (_, action) =>
		action.type !== allConstants.PING
});

const enhancer = process.env.NODE_ENV === 'production' ? applyMiddleware(thunkMiddleware) : applyMiddleware(thunkMiddleware, loggerMiddleware);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

// dev only
window.store = store;

export { store };