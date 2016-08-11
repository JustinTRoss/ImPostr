import fetch from 'isomorphic-fetch';

export const REQUEST_START = 'REQUEST_START';
export const RECEIVE_USER_LOGIN = 'RECEIVE_USER_LOGIN';
export const RECEIVE_FAILURE = 'RECEIVE_FAILURE';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_USER_SIGNUP = 'RECEIVE_USER_SIGNUP';
export const UPDATE_FORM_VALUE = 'UPDATE_FORM_VALUE';
export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';
export const RECEIVE_JWT_FAILURE = 'RECEIVE_JWT_FAILURE';
export const RECEIVE_JWT_SUCCESS = 'RECEIVE_JWT_SUCCESS';

export const receiveJWTSuccess = () => {
  return {
    type: RECEIVE_JWT_SUCCESS,
  }
}

export const receiveJWTFailure = () => {
  return {
    type: RECEIVE_JWT_FAILURE,
  }
}


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

export const checkJWTWithServer = () => {
  return dispatch => {
    dispatch(requestStart());
    const token = window.localStorage.getItem('ImPostr-JWT');
    if (!token) { 
      dispatch(receiveJWTFailure);
    } else {
      console.log(token);
      return fetch('http://127.0.0.1:3000/user/checkJWT', {
        headers: new Headers({
          'Authorization': `JWT ${token}`,
        }),
      })
      .then(res => res.json())
      .then(jsonRes => {
      console.log(jsonRes);
      dispatch(receiveJWTSuccess(jsonRes));
      })
      .catch(err => {
        console.error(err, 'error in JWT Validation');
        dispatch(receiveJWTFailure);
      });
    }
  }
}

export const sendLoginToServer = ( formData ) => {
  return dispatch => {
    dispatch(requestStart());
    dispatch(updateFormValue(formData));
    return fetch(`http://127.0.0.1:3000/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      // if successful login
      .then(response => response.json())
      .then(jsonRes => {
        console.log(jsonRes, jsonRes.token);
        window.localStorage.setItem('ImPostr-JWT', jsonRes.token);
        dispatch(receiveLogin(jsonRes));
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
        username: formData.username,
        password: formData.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      // if successful SIGNUP
      .then(response => response.json())
      .then(jsonRes => {
        window.localStorage.setItem('ImPostr-JWT', jsonRes.token);
        dispatch(receiveSignup(jsonRes));
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
    const token = window.localStorage.getItem('ImPostr-JWT');
    window.localStorage.removeItem('ImPostr-JWT');
    let stateToStore = getState();
    return fetch(`http://127.0.0.1:3000/user/logout`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        storedState: stateToStore,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
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
