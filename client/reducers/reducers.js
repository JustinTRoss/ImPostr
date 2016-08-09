import { combineReducers } from 'redux';
import postQueue from './postQueue';
import platformList from './platformList';
import userLogin from './userLoginReducers';
import pageNav from './nav';

const app = combineReducers({
  postQueue,
  platformList,
  userLogin,
  pageNav,
});

export default app;
