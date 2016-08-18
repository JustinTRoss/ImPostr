import { checkJWTWithServer, receiveLogout } from '../actions/UserLoginActions';
import { requestPlatformLogin } from '../actions/platformListActions';
import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps(state) {
  const loggedIn = state.userLogin.loggedIn;
  return {
    loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkJWT: () => { dispatch(checkJWTWithServer()); },
    receiveLogout: () => { dispatch(receiveLogout()); },
    requestPlatformLogin: (platform, userID, accessToken) => { dispatch(requestPlatformLogin(platform, userID, accessToken)); },
  };
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
