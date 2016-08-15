import { combineReducers } from 'redux';
import postQueue from './postQueue';
import platformList from './platformList';
import userLogin from './UserLoginReducers';
import addNewPost from './addNewPostReducer';

const app = combineReducers({
  postQueue,
  platformList,
  userLogin,
  addNewPost,
});

export default app;
