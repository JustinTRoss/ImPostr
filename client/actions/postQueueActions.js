export const REMOVE_ITEM_FROM_QUEUE = 'REMOVE_ITEM_FROM_QUEUE';
export const INSERT_ITEM_FROM_QUEUE = 'INSERT_ITEM_FROM_QUEUE';

export const removeItem = (index) => ({
  type: REMOVE_ITEM_FROM_QUEUE,
  index,
});

export const insertItem = (index) => ({
  type: INSERT_ITEM_FROM_QUEUE,
  index,
});

  // const token = window.localStorage.getItem('ImPostr-JWT');
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': `JWT ${token}`,

  // },
