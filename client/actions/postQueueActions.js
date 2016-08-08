export const REMOVE_ITEM_FROM_QUEUE = 'REMOVE_ITEM_FROM_QUEUE';
export const INSERT_ITEM_FROM_QUEUE = 'INSERT_ITEM_FROM_QUEUE';

// presumably, we're inserting or removing an item from post queue here
// we'd also need to pass an index because simple
// pop/push doesn't encompass inserting in the middle

//moves to the bottom of the list
//changes stlying
//gets removed once the time expires by worker 

//allows user to veto and item in the queue
export const removeItem = (index) => {
  return {
    type: REMOVE_ITEM_FROM_QUEUE,
    index,
  };
};

//allows user to put a removed item back into queue
export const insertItem = (index) => {
  return {
    type: INSERT_ITEM_FROM_QUEUE,
    index,
  };
};
