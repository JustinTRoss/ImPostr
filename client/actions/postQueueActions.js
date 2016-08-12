export const REMOVE_ITEM_FROM_QUEUE = 'REMOVE_ITEM_FROM_QUEUE';
export const INSERT_ITEM_FROM_QUEUE = 'INSERT_ITEM_FROM_QUEUE';
export const INSERT_QUEUE = 'INSERT_QUEUE';

export const removeItem = (index) => ({
  type: REMOVE_ITEM_FROM_QUEUE,
  index,
});

export const insertItem = (index) => ({
  type: INSERT_ITEM_FROM_QUEUE,
  index,
});

export const insertQueue = ({ queue }) => (
  {
    type: INSERT_QUEUE,
    queue,
  }
);

export const requestQueue = () => {
  let token = window.localStorage.getItem('ImPostr-JWT');
  return dispatch => {
    fetch(`http://localhost:3000/post/getUser`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log('/getUser-----------(*DS&F', json.queue);
        dispatch(insertQueue(json));
      })
      .catch(err => console.log(err, '/getUser'));
  };
};
