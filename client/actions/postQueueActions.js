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

export const requestQueue = (token) => {
  return dispatch => {
    fetch(`http://localhost:3000/post/getUser`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(insertQueue(json));
      })
  };
};

export const requestRemove = ({ postId, isActive, index }) => {
  return (dispatch, getState) => {
    const { userLogin: { token } } = getState();
    fetch(`http://localhost:3000/post/toggleIsActive`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        isActive,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
    })
      .then(res => res.json())
      .then(confirmationOfRemoval => {
        if (isActive === 'f') {
          dispatch(removeItem(index));
        } else {
          dispatch(insertItem(index));
        }
      })
  };
};
