import { combineReducers } from 'redux';
import postQueue from './postQueue';
import platformList from './platformList';
import userLogin from './UserLoginReducers';

const app = combineReducers({
  postQueue,
  platformList,
  userLogin,
});

export default app;
