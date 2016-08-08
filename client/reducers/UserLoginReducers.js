import { REQUEST_USER_LOGIN, RECEIVE_USER_LOGIN, RECEIVE_FAILED_LOGIN, USER_LOGOUT, CHECK_USER_LOGIN } from '../actions/UserLoginActions';

const UserObject = (state = {
  userId: '',
  username: '',
  password: '',
  loggedIn: false,
}, action) => {
  switch(action.type) {
    // case REQUEST_USER_LOGIN:
    //   return Object.assign({}, state, {
    //     // Do something to let user know we are processing request
    //   });
    case RECEIVE_USER_LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        password: '',
      });
    case RECEIVE_FAILED_LOGIN:
      return Object.assign({}, state, {
        password: '',
        loggedIn: false,
      });
  }
}
const AuthModal = () => {

}
