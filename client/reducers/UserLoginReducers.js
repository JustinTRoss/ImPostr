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

} from '../actions/UserLoginActions';

const UserObject = (state = {
  userId: '',
  isLogin: 'login',
  loggedIn: false,
  login: {  
    username: '',
    password: '',
  },
  signup: {
    username: '',
    password: '',
  },
}, action) => {
  switch (action.type) {
    case RECEIVE_JWT_FAILURE:
      return Object.assign({}, state, {
        isLoggedIn: false,
      })
    case RECEIVE_JWT_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
      })
    case CHANGE_FORM_TYPE:
      return Object.assign({}, state, {
        isLogin: action.formType,
      })
    case UPDATE_FORM_VALUE:
      return Object.assign({}, state, action.formData);
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
        login: {
          username: '',
          password: '',
        },
      });
    case RECEIVE_USER_SIGNUP:
      return Object.assign({}, state, {
        loggedIn: true,
        signup: {
          username: '',
          password: '',
        },
      });
    case RECEIVE_USER_LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    default:
      return state;
  }
};

export default UserObject;
