import { connect } from 'react-redux';
import { checkJWTWithServer, requestLogout } from '../actions/UserLoginActions';
import { requestPlatformLogin } from '../actions/platformListActions';
import App from '../components/App';

function mapStateToProps(state) {
  const loggedIn = state.userLogin.loggedIn;
  const requestingStart = state.userLogin.requestingStart;
  return {
    loggedIn,
    requestingStart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkJWT: () => { dispatch(checkJWTWithServer()); },
    requestLogout: () => { dispatch(requestLogout()); },
    requestPlatformLogin: (platform, userID, accessToken) => { dispatch(requestPlatformLogin(platform, userID, accessToken)); },
  };
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
