import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/reducers';

const loggerMiddleware = createLogger();


//user second argument to creatStore to @steven HYDRATE from server
export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
