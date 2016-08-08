import { combineReducers } from 'redux';
import postQueue from './postQueue';
import platformList from './platformList';
import userLogin from './userLoginReducers';

const app = combineReducers({
  postQueue,
  platformList,
  userLogin
});



export default app;
