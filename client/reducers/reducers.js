import { combineReducers } from 'redux';
import { REMOVE_ITEM_FROM_QUEUE, INSERT_ITEM_FROM_QUEUE } from '../actions/postQueueActions.js';

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
