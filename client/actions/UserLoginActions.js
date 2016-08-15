import fetch from 'isomorphic-fetch';
import { getSettingsFields } from './platformListActions';

export const REQUEST_START = 'REQUEST_START';
export const RECEIVE_USER_LOGIN = 'RECEIVE_USER_LOGIN';
export const RECEIVE_FAILURE = 'RECEIVE_FAILURE';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_USER_SIGNUP = 'RECEIVE_USER_SIGNUP';
export const UPDATE_FORM_VALUE = 'UPDATE_FORM_VALUE';
export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';
export const RECEIVE_JWT_FAILURE = 'RECEIVE_JWT_FAILURE';
export const RECEIVE_JWT_SUCCESS = 'RECEIVE_JWT_SUCCESS';
export const THROW_FIELD_VALIDATION_ERROR = 'THROW_FIELD_VALIDATION_ERROR';


/**********ASYNC START AND END**********/

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

/**********JWT AND COOKIE**********/

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


export const checkJWTWithServer = () => {
  return dispatch => {
    dispatch(requestStart());
    const token = window.localStorage.getItem('ImPostr-JWT');
    if (!token) {
      dispatch(receiveJWTFailure);
    } else {
      return fetch('http://127.0.0.1:3000/user/checkJWT', {
        headers: new Headers({
          'Authorization': `JWT ${token}`,
        }),
      })
      .then(res => res.json())
      .then(jsonRes => {
        dispatch(receiveJWTSuccess(jsonRes));
        dispatch(getSettingsFields());
      })
      .catch(err => {
        console.error(err, 'error in JWT Validation');
        dispatch(receiveJWTFailure());
      });
    }
  }
}

/**********FORMS***********/

export const throwFieldValidationError = (formData, fieldName, formName) => {
  return {
    type: THROW_FIELD_VALIDATION_ERROR,
    fieldName,
    formName,
  }
}

export const updateFormValue = ( formData, formName ) => {
  return {
    type: UPDATE_FORM_VALUE,
    formData,
    formName,
  }
}

export const changeFormType = ( formType ) => {
  return {
    type: CHANGE_FORM_TYPE,
    formType,
  }
}

/**********LOGIN**********/

export const receiveLogin = ({ userId }) => {
  return {
    type: RECEIVE_USER_LOGIN,
    userId,
  };
};

export const sendLoginToServer = ( formData ) => {
  return dispatch => {
    dispatch(requestStart());
    dispatch(updateFormValue(formData, 'login'));
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
        window.localStorage.setItem('ImPostr-JWT', jsonRes.token);
        document.cookie = `jwtStuff=${jsonRes.token}`;
        dispatch(receiveLogin(jsonRes));
      })
      // if failed login
      .catch(err => {
        console.error(err, 'error logging in');
        dispatch(receiveFailure(formData));
      });
  };
};

/**********SIGNUP**********/

export const receiveSignup = ({ userId }) => {
  return {
    type: RECEIVE_USER_SIGNUP,
    userId,
  };
};

export const sendSignupToServer = ( formData ) => {
  return dispatch => {
    if (formData.username.length < 8) {
      dispatch(throwFieldValidationError(formData, 'username', 'signup'));
    } else if (formData.password.length < 8) {
      dispatch(throwFieldValidationError(formData, 'username', 'signup'));
    } else {
      dispatch(requestStart());
      dispatch(updateFormValue(formData, 'signup'));
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
          document.cookie = `jwtStuff=${jsonRes.token}`;
          dispatch(receiveSignup(jsonRes));
        })
        // if failed SIGNUP
        .catch(err => {
          console.error(err, 'error signing up');
          dispatch(receiveFailure(formData));
        });
    }
  };
};

/**********LOGOUT**********/

export const receiveLogout = () => {
  return {
    type: RECEIVE_USER_LOGOUT,
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
