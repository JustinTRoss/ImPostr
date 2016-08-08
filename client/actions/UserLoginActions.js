import fetch from 'isomorphic-fetch';

export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
export const RECEIVE_USER_LOGIN = 'RECEIVE_USER_LOGIN';
export const RECEIVE_FAILED_LOGIN = 'RECEIVE_FAILED_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const REQUEST_JWT_VALIDATION = 'REQUEST_JWT_VALIDATION';
export const RECEIVE_JWT_SUCCESS = 'RECEIVE_JWT_SUCCESS';
export const RECEIVE_JWT_FAILURE = 'RECEIVE_JWT_FAILURE';

const requestLogin = () => {
  return {
    type: REQUEST_USER_LOGIN,
  };

  // toggles the user logging in flag, which should
  // cause some sort of indicator to the user the login
  // process is queued, but not yet complete
};

const receiveLogin = ({ userId, loggedIn }) => {
  return {
    type: RECEIVE_USER_LOGIN,
    userId,
  };
};

const receiveFailure = { username } => {
  return {
    type: RECEIVE_FAILED_LOGIN,
    username,
  };

  // clear out password since it was wrong
  // in the event incorrect credentials are supplied
};

const sendLoginToServer = ({ username, password }) => {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      // if successful login
      .then(response => response.json())
      .then(json => {
        dispatch(receiveLogin(json));
      })
      // if failed login
      .catch(err => {
        console.error(err, 'error logging in');
        dispatch(receiveFailure({ username }));
      });
  };
};

const requestLogout = { username } => {
  return (dispatch, getState) => {
    let stateToStore = getState();
    return fetch(`http://localhost:3000/auth/logout`, {
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
      .catch(err => console.error(err, 'could not log out!'));
  };
};

const setNewUserState = () => {
  return {
    //wtf is the default state?
  }
}

const sendJWTToServer = JWT => {
  return dispatch => {
    dispatch(requestJWTValidation());
    return fetch(`http://localhost:3000/auth/validateJWT`, {
      method: 'POST',
      headers: new Headers({
        'Authorization' : `JWT ${JWT}`, // <~~~ May need to be 'Bearer' - Check later
      }),
    })
      // if JWT is valid
      .then(response => response.json())
      .then(json => {
        dispatch(receiveJWTSuccess(json));
      })
      // if JWT is not valid
      .catch(err => {
        console.error(err, 'error validating JWT');
        dispatch(receiveJWTFailure());
      });
  };
}

// Idk what we will use this for yet.
const requestJWTValidation = () => {
  return {
    type: REQUEST_JWT_VALIDATION,
  }
}

const receiveJWTSuccess = {PlatformList, PostQueue, UserLoggedIn} => {
  return {
    type: RECEIVE_JWT_SUCCESS,
    PlatformList,
    PostQueue,
    UserLoggedIn,
  }
}

const receiveJWTFailure = () => {
  return {
    type: RECEIVE_JWT_FAILURE,
  }
}
