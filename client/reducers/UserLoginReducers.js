import {
  REQUEST_START,
  RECEIVE_FAILURE,
  RECEIVE_USER_LOGIN,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGNUP,
  UPDATE_FORM_VALUE,
  CHANGE_FORM_TYPE,
  RECEIVE_JWT_FAILURE,
  RECEIVE_JWT_SUCCESS,
  THROW_FIELD_VALIDATION_ERROR,
} from '../actions/UserLoginActions';

const UserObject = (state = {
  userId: '',
  token: '',
  isLogin: 'login',
  loggedIn: false,
  login: {
    error: '',
    username: '',
    password: '',
  },
  signup: {
    error: '',
    username: '',
    password: '',
  },
}, action) => {
  switch (action.type) {
    case RECEIVE_JWT_FAILURE:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    case RECEIVE_JWT_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        token: action.token,
      });
    case THROW_FIELD_VALIDATION_ERROR:
      const errorObj = {
        error: `${action.fieldName} must be greater than 8 characters`,
        username: '',
        password: '',
      };
      if (action.formName === 'login') {
        return Object.assign({}, state, {
          login: errorObj,
        });
      } else if (action.formName === 'signup') {
        return Object.assign({}, state, {
          signup: errorObj,
        });
      } else {
        return state;
      }
    case CHANGE_FORM_TYPE:
      return Object.assign({}, state, {
        isLogin: action.formType,
      });
    case UPDATE_FORM_VALUE:
      if (action.formName === 'login') {
        return Object.assign({}, state, {
          login: action.formData,
        });
      } else if (action.formName === 'signup') {
        return Object.assign({}, state, {
          signup: action.formData,
        });
      } else {
        return state;
      }
    case REQUEST_START:
      return Object.assign({}, state, {
        // Do something to let user know we are processing request
      });
    case RECEIVE_FAILURE:
      return Object.assign({}, state, {
        login: {
          username: '',
          password: '',
        },
        signup: {
          username: '',
          password: '',
        },
        loggedIn: false,
      });
    case RECEIVE_USER_LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        token: action.token,
        login: {
          username: '',
          password: '',
        },
      });
    case RECEIVE_USER_SIGNUP:
      return Object.assign({}, state, {
        loggedIn: true,
        token: action.token,
        signup: {
          username: '',
          password: '',
        },
      });
    case RECEIVE_USER_LOGOUT:
      window.localStorage.removeItem('ImPostr-JWT');
      document.cookie = `jwtStuff='';expires=Thu, 01-Jan-70 00:00:01 GMT`;
      return Object.assign({}, state, {
        loggedIn: false,
      });
    default:
      return state;
  }
};

export default UserObject;
