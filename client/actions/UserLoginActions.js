import fetch from 'isomorphic-fetch';
import { getSettingsFields } from './platformListActions';
import { requestQueue } from './postQueueActions';
import { requestHistory } from './historyListActions';

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

export const requestStart = () => ({
  type: REQUEST_START,
});

export const receiveFailure = ({ username, formName }) => ({
  type: RECEIVE_FAILURE,
  username,
  formName,
});

/**********JWT AND COOKIE**********/

export const receiveJWTSuccess = ({ token }) => ({
  type: RECEIVE_JWT_SUCCESS,
  token,
});

export const receiveJWTFailure = () => ({
  type: RECEIVE_JWT_FAILURE,
});

export const checkJWTWithServer = () => {
  return dispatch => {
    dispatch(requestStart());
    const token = window.localStorage.getItem('ImPostr-JWT');
    if (!token) {
      dispatch(receiveJWTFailure);
    } else {
      return fetch('http://127.0.0.1:3000/user/checkJWT', {
        headers: new Headers({
          Authorization: `JWT ${token}`,
        }),
      })
      .then(res => res.json())
      .then(jsonRes => {
        dispatch(receiveJWTSuccess(jsonRes));
        return;
      }).then(() => {
        dispatch(getSettingsFields());
        dispatch(requestQueue());
        dispatch(requestHistory());
      })
      .catch(err => {
        console.error(err, 'error in JWT Validation');
        dispatch(receiveJWTFailure());
      });
    }
  };
};

/**********FORMS***********/

export const throwFieldValidationError = (fieldName, formName) => {
  return {
    type: THROW_FIELD_VALIDATION_ERROR,
    fieldName,
    formName,
  };
};

export const updateFormValue = (formData, formName) => {
  return {
    type: UPDATE_FORM_VALUE,
    formData,
    formName,
  };
};

export const changeFormType = (formType) => {
  return {
    type: CHANGE_FORM_TYPE,
    formType,
  };
};

/**********LOGIN**********/

export const receiveLogin = ({ userId, token }) => {
  return {
    type: RECEIVE_USER_LOGIN,
    userId,
    token,
  };
};

export const sendLoginToServer = (formData) => {
  const { username, password } = formData;
  return dispatch => {
    dispatch(requestStart());
    dispatch(updateFormValue(formData, 'login'));
    return fetch(`http://127.0.0.1:3000/user/login`, {
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
      .then(jsonRes => {
        window.localStorage.setItem('ImPostr-JWT', jsonRes.token);
        document.cookie = `jwtStuff=${jsonRes.token}`;
        dispatch(receiveLogin(jsonRes));
      })
      .then(() => { dispatch(checkJWTWithServer()); })
      .catch(err => {
        console.error(err, 'error logging in');
        dispatch(receiveFailure(formData));
      });
  };
};

/**********SIGNUP**********/

export const receiveSignup = ({ userId, token }) => {
  return {
    type: RECEIVE_USER_SIGNUP,
    userId,
    token,
  };
};

export const sendSignupToServer = (formData) => {
  const { username, password } = formData;
  return dispatch => {
    if (username.length < 8) {
      dispatch(throwFieldValidationError(formData, 'username', 'signup'));
    } else if (password.length < 8) {
      dispatch(throwFieldValidationError(formData, 'username', 'signup'));
    } else {
      dispatch(requestStart());
      dispatch(updateFormValue(formData, 'signup'));
      return fetch(`http://127.0.0.1:3000/user/signup`, {
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
        .then(jsonRes => {
            console.log('jsonRes', jsonRes);
          window.localStorage.setItem('ImPostr-JWT', jsonRes.token);
          document.cookie = `jwtStuff=${jsonRes.token}`;
          dispatch(receiveSignup(jsonRes));
        })
        .catch(err => {
          console.error(err, 'error signing up');
          dispatch(receiveFailure(formData));
        });
    }
  };
};

/**********LOGOUT**********/

export const receiveLogout = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const requestLogout = ({ username }) => {
  return (dispatch, getState) => {
    dispatch(requestStart());
    window.localStorage.removeItem('ImPostr-JWT');
    const { userLogin: { token } } = getState();
    const stateToStore = getState();
    return fetch(`http://127.0.0.1:3000/user/logout`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        storedState: stateToStore,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveLogout(json));
      })
      .catch(err => {
        dispatch(receiveFailure({ username }));
        console.error(err, 'could not log out!');
      });
  };
};
