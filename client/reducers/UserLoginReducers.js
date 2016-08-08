import { REQUEST_START, RECEIVE_USER_LOGIN, RECEIVE_FAILURE, RECEIVE_USER_LOGOUT } from '../actions/UserLoginActions';

const UserObject = (state = {
  userId: '',
  username: '',
  password: '',
  loggedIn: false,
}, action) => {
  switch(action.type) {
    case REQUEST_START:
      return Object.assign({}, state, {
        // Do something to let user know we are processing request
      });
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
    case RECEIVE_USER_LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
      })
    case RECEIVE_FAILED_LOGOUT:
      return Object.assign({}, state, {
        //Do something?
      })
  }
}
