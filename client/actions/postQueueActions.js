export const REMOVE_ITEM_FROM_QUEUE = 'REMOVE_ITEM_FROM_QUEUE';
export const INSERT_ITEM_FROM_QUEUE = 'INSERT_ITEM_FROM_QUEUE';

// presumably, we're inserting or removing an item from post queue here
// we'd also need to pass an index because simple
// pop/push doesn't encompass inserting in the middle

export const removeItem = (index) => {
  return {
    type: REMOVE_ITEM_FROM_QUEUE,
    index,
  };
};

export const insertItem = (index) => {
  return {
    TYPE: INSERT_ITEM_FROM_QUEUE,
    index,
  };
};
