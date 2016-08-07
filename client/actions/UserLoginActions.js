import fetch from 'isomorphic-fetch';

export const REQUEST_USER_LOG_IN = 'REQUEST_USER_LOG_IN';
export const RECEIVE_USER_LOG_IN = 'RECEIVE_USER_LOG_IN';
export const RECEIVE_FAILED_LOG_IN = 'RECEIVE_FAILED_LOG_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';

const requestLogin = () => {
  return {
    type: REQUEST_USER_LOG_IN,
  };

  // toggles the user logging in flag, which should
  // cause some sort of indicator to the user the login
  // process is queued, but not yet complete
};

const receiveLogin = ({ userId, loggedIn }) => {
  return {
    type: RECEIVE_USER_LOG_IN,
    userId,
    loggedIn,
    password: null,

    // for successful login, remove pass and set loggedIn to true
  };
};

const receiveFailure = ({ username }) => {
  return {
    type: RECEIVE_FAILED_LOG_IN,
    username,
    password: '',
    loggedIn: false,
  };

  // clear out password since it was wrong
  // in the event incorrect credentials are supplyed
};

const requestLogin = ({ username, password }) => {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(`http://localhost:3000/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveLogin(json));

        // if successful login
      })
      .catch((err) => {
        console.log(err, 'error logging in');
        dispatch(receiveFailure({ username }));

        // if failed login
      });
  };
};

const requestLogout = ({ username }) => {
  return (dispatch, getState) => {
    let stateToStore = getState();
    return fetch(`http://localhost:3000/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        storedState: stateToStore,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(json => console.log(json, 'logged out'))
      .catch((err) => console.log(err, 'could not log out!'));
  };
};
