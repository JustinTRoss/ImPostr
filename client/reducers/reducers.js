import { combineReducers } from 'redux';
import postQueue from './postQueue';
import platformList from './platformList';

const app = combineReducers({
  postQueue,
  platformList,
});

import { REMOVE_ITEM_FROM_QUEUE, INSERT_ITEM_FROM_QUEUE } from '../actions/postQueueActions';
import {} from './UserLoginReducers';
import { TOGGLE_MODAL, UPDATE_SETTINGS_FIELD, LOGIN_PLATFORM, LOGOUT_PLATFORM, INITIALIZE_PLATFORM } from '../actions/platformListActions';

export default app;
