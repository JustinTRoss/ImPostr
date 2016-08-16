import { combineReducers } from 'redux';
import postQueue from './postQueue';
import platformList from './platformList';
import userLogin from './UserLoginReducers';
import addNewPost from './addNewPostReducer';
import historyList from './historyListReducers';

const app = combineReducers({
  postQueue,
  platformList,
  userLogin,
  addNewPost,
  historyList,
});

export default app;
