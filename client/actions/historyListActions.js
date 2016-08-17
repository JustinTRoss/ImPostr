import fetch from 'isomorphic-fetch';

export const RECEIVE_USER_HISTORY = 'RECEIVE_USER_HISTORY';

export const receiveHistory = ({ history }) => (
  {
    type: RECEIVE_USER_HISTORY,
    history,
  }
);

export const requestHistory = (token) => {
  return dispatch => {
    fetch('http://localhost:3000/post/getPostHistory', {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(receiveHistory(json));
      })
      .catch(err => console.error('err with requesting history', err));
  };
};
