import { combineReducers } from 'redux';
import { REMOVE_ITEM_FROM_QUEUE, INSERT_ITEM_FROM_QUEUE } from '../actions/postQueueActions.js';

import { TOGGLE_MODAL, UPDATE_SETTINGS_FIELD, LOGIN_PLATFORM, LOGOUT_PLATFORM, INITIALIZE_PLATFORM } from '../actions/platformListActions.js';

const PostQueue = (state = {
  queuedItems: [],
  removedItems: [],
}, action) => {
  switch (action.type) {
    case REMOVE_ITEM_FROM_QUEUE:
      let newQueue = state.queuedItems.slice();
      let newRemoved = state.removedItems.slice();
      let temp = newQueue.splice(action.index, 1);
      newRemoved.push(temp[0]);
      return Object.assign({}, state, {
        queuedItems: newQueue,
        removedItems: newRemoved,
      });

      // presumably, we keep a copy of removed items
    default:
      return state;
  }
};


const PlatformListEntry = (state = {
  platformName: '',
  userPlatformLoggedIn: false,
  showModal: false,
  settings: {
    autoPilot: false,
    interests: [],
    postFrequency: 0,
  }
}, action) => {
  switch(action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        showModal: !showModal,
      });
    case LOGOUT_PLATFORM:
      return Object.assign({}, state, {
        userPlatformLoggedIn: false,
      });
    case UPDATE_SETTINGS_FIELD:
      return Object.assign({}, state, {
        settings: action.settings,
      });
    case LOGIN_PLATFORM:
      return Object.assign({}, state, {
        userPlatformLoggedIn: true,
      });
    case ADD_PLATFORM:
      return Object.assign({}, state, {
        platformName: action.platform,
      });
    default:
      return state;
  }
}

const PlatformList = (state = [], action) => {
  switch(action.type) {
    case ADD_PLATFORM:
      return [
      ...state,
      PlatformListEntry(null, action)
      ]
    default:
      return platforms.map(platform => {
        if (platform.platformName !== action.platform) {
          return platform;
        }
        return PlatformListEntry(platform, action);
      });
  }
}