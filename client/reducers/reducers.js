import { combineReducers } from 'redux';
import postQueue from './postQueue';
import platformList from './platformList';

const app = combineReducers({
  postQueue,
  platformList,
});

export default app;
