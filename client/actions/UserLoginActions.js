import fetch from 'isomorphic-fetch';

export const REQUEST_START = 'REQUEST_START';
export const RECEIVE_USER_LOGIN = 'RECEIVE_USER_LOGIN';
export const RECEIVE_FAILURE = 'RECEIVE_FAILURE';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_USER_SIGNUP = 'RECEIVE_USER_SIGNUP';
export const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE';
export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';


const requestStart = () => {
  return {
    type: REQUEST_START,
  };

  // toggles the user logging in flag, which should
  // cause some sort of indicator to the user the login
  // process is queued, but not yet complete
};

const receiveFailure = ({ username, formName}) => {
  return {
    type: RECEIVE_FAILURE,
    username,
    formName,
  };
};

const updateFieldValue = ({ formName, fieldName, newValue }) => {
  return {
    type: UPDATE_FIELD_VALUE,
    formName,
    fieldName,
    newValue,
  }
}

const changeFormType = ({ formType }) => {
  return {
    type: CHANGE_FORM_TYPE,
    formType,
  }
}

const receiveLogin = ({ userId }) => {
  return {
    type: RECEIVE_USER_LOGIN,
    userId,
  };
};

const receiveSignup = ({ userId }) => {
  return {
    type: RECEIVE_USER_SIGNUP,
    userId,
  };
};


const receiveLogout = () => {
  return {
    type: RECEIVE_USER_LOGOUT,
  };
};

const sendLoginToServer = ({ username, password }) => {
  return dispatch => {
    dispatch(requestStart());
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

const sendSignupToServer = ({ username, password, fullName }) => {
  return dispatch => {
    dispatch(requestStart());
    return fetch(`http://localhost:3000/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        fullName,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      // if successful SIGNUP
      .then(response => response.json())
      .then(json => {
        dispatch(receiveSignup(json));
      })
      // if failed SIGNUP
      .catch(err => {
        console.error(err, 'error signing up');
        dispatch(receiveFailure({ username }));
      });
  };
};

const requestLogout = ({ username }) => {
  return (dispatch, getState) => {
    dispatch(requestStart());
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
      .then(json => {
        dispatch(receiveLogin(json));
        console.log(json, 'logged out');
      })
      .catch(err => {
        dispatch(receiveFailure({ username }));
        console.error(err, 'could not log out!');
      });
  };
};
