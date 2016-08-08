import { REMOVE_ITEM_FROM_QUEUE, INSERT_ITEM_FROM_QUEUE } from '../actions/postQueueActions';

const PostQueue = (state = {
  queuedItems: [],
  removedItems: [],
}, action) => {
  switch (action.type) {
    case REMOVE_ITEM_FROM_QUEUE:
      const newQueue = state.queuedItems.slice();
      const newRemoved = state.removedItems.slice();
      const temp = newQueue.splice(action.index, 1);
      newRemoved.push(temp[0]);
      return Object.assign({}, state, {
        queuedItems: newQueue,
        removedItems: newRemoved,
      });

    case INSERT_ITEM_FROM_QUEUE:
      const newQueueInsert = state.queuedItems.slice();
      const newRemovedInsert = state.removedItems.slice();
      const tempInsert = newRemovedInsert.splice(action.index, 1);
      newQueueInsert.push(tempInsert[0]);
      return Object.assign({}, state, {
        queuedItems: newQueueInsert,
        removedItems: newRemovedInsert,
      });

    default:
      return state;
  }
};

export default PostQueue;
