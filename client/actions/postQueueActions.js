import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

polyfill();

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

export const insertQueue = ({ queue }) => ({
  type: INSERT_QUEUE,
  queue,
});

export const requestQueue = (token) => {
  return dispatch => {
    return fetch(`http://localhost:3000/post/getUser`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(insertQueue(json));
      });
  };
};

export const requestRemove = (post, index) => {
  const { postId, isActive } = post;
  return (dispatch, getState) => {
    const { userLogin: { token } } = getState();
    return fetch(`http://localhost:3000/post/toggleIsActive`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        isActive: !isActive,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
    })
      .then(res => res.json())
      .then(status => {
        if (isActive && status.status) {
          dispatch(removeItem(index));
        }
        if (!isActive && status.status) {
          dispatch(insertItem(index));
        }
      });
  };
};
