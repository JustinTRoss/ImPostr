import fetch from 'isomorphic-fetch';

export const REQUEST_START = 'REQUEST_START';
export const RECEIVE_USER_LOGIN = 'RECEIVE_USER_LOGIN';
export const RECEIVE_FAILURE = 'RECEIVE_FAILURE';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_USER_SIGNUP = 'RECEIVE_USER_SIGNUP';
export const UPDATE_FORM_VALUE = 'UPDATE_FORM_VALUE';
export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';


export const requestStart = () => {
  return {
    type: REQUEST_START,
  };

  // toggles the user logging in flag, which should
  // cause some sort of indicator to the user the login
  // process is queued, but not yet complete
};

export const receiveFailure = ({ username, formName}) => {
  return {
    type: RECEIVE_FAILURE,
    username,
    formName,
  };
};

export const updateFormValue = ( formData ) => {
  return {
    type: UPDATE_FORM_VALUE,
    formData,
  }
}

export const changeFormType = ( formType ) => {
  return {
    type: CHANGE_FORM_TYPE,
    formType,
  }
}

export const receiveLogin = ({ userId }) => {
  return {
    type: RECEIVE_USER_LOGIN,
    userId,
  };
};

export const receiveSignup = ({ userId }) => {
  return {
    type: RECEIVE_USER_SIGNUP,
    userId,
  };
};


export const receiveLogout = () => {
  return {
    type: RECEIVE_USER_LOGOUT,
  };
};

export const sendLoginToServer = ( formData ) => {
  return dispatch => {
    dispatch(requestStart());
    dispatch(updateFormValue(formData));
    return fetch(`http://127.0.0.1:3000/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        formData,
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
        dispatch(receiveFailure(formData));
      });
  };
};

export const sendSignupToServer = ( formData ) => {
  return dispatch => {
    dispatch(requestStart());
    dispatch(updateFormValue(formData));
    return fetch(`http://127.0.0.1:3000/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        formData,
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
        dispatch(receiveFailure(formData));
      });
  };
};

export const requestLogout = ({ username }) => {
  return (dispatch, getState) => {
    dispatch(requestStart());
    let stateToStore = getState();
    return fetch(`http://127.0.0.1:3000/user/logout`, {
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
