export const REMOVE_ITEM_FROM_QUEUE = 'REMOVE_ITEM_FROM_QUEUE';
export const INSERT_ITEM_FROM_QUEUE = 'INSERT_ITEM_FROM_QUEUE';

//allows user to veto and item in the queue
export const removeItem = (index) => ({
  type: REMOVE_ITEM_FROM_QUEUE,
  index,
});

//allows user to put a removed item back into queue
export const insertItem = (index) => ({
  type: INSERT_ITEM_FROM_QUEUE,
  index,
});
