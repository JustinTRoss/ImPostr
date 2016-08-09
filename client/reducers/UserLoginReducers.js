import { REQUEST_START, RECEIVE_FAILURE, RECEIVE_USER_LOGIN, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGNUP, UPDATE_FIELD_VALUE, CHANGE_FORM_TYPE } from '../actions/UserLoginActions';

const UserObject = (state = {
  userId: '',
  isLogin: false,
  loggedIn: false,
  login: {  
    username: '',
    password: '',
  },
  signup: {
    username: '',
    password: '',
    fullName: '',
  },
}, action) => {
  switch (action.type) {
    case CHANGE_FORM_TYPE:
      return Object.assign({}, state, {
        isLogin: action.isLogin,
      })
    case UPDATE_FIELD_VALUE:
      return Object.assign({}, state, {
        [action.formName.fieldName]: action.newValue,
      });
    case REQUEST_START:
      return Object.assign({}, state, {
        // Do something to let user know we are processing request
      });
    case RECEIVE_FAILURE:
      return Object.assign({}, state, {
        [login.password]: '',
        loggedIn: false,
      });
    case RECEIVE_USER_LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        [login.username]: '',
        [login.password]: '',
      });
    case RECEIVE_USER_SIGNUP:
      return Object.assign({}, state, {
        loggedIn: true,
        [signup.username]: '',
        [signup.password]: '',
        [signup.fullName]: '',
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
