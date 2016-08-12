import React from 'react';
import { connect } from 'react-redux';
import { checkJWTWithServer, receiveLogout } from '../actions/UserLoginActions';
import { requestPlatformLogin } from '../actions/platformListActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Auth from './Auth';
import { requestQueue } from '../actions/postQueueActions';
import { FACEBOOK_APP_ID } from '../../__cutestuff';



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { checkJWT, pullQueue, requestPlatformLogin } = this.props;
    checkJWT();
    pullQueue();

    /************** Facebook SDK Injectino *****************/

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      FB.init({
        appId      : FACEBOOK_APP_ID,
        xfbml      : true,
        version    : 'v2.7',
      });

      const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
      };

      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].split('=')[0].indexOf('fblo_') !== -1) {
          deleteCookie(cookies[i].split('=')[0]);
        };
      };

      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          const { userID, accessToken } = response.authResponse;
          requestPlatformLogin('facebook', userID, accessToken);
        }
      });
    };
  }

  render() {
    const childToRender = this.props.loggedIn ? <Home /> : <Auth />;

    return (
      <div>App
        <Navbar receiveLogout={this.props.receiveLogout} />
          {childToRender}
        <Footer />
      </div>
		);
	}
}

function mapStateToProps(state) {
  const loggedIn = state.userLogin.loggedIn;
  return {
    loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkJWT: () => { dispatch(checkJWTWithServer()); },
    pullQueue: () => { dispatch(requestQueue()); },
    receiveLogout: () => { dispatch(receiveLogout()); },
    requestPlatformLogin: (platform, userID, accessToken) => { dispatch(requestPlatformLogin(platform, userID, accessToken)); },
  };
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
