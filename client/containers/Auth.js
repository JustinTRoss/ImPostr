import React from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';
import Signup from '../components/Signup';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this)
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleSignupUsernameChange = this.handleSignupUsernameChange.bind(this);
    this.handleSignupPasswordChange = this.handleSignupPasswordChange.bind(this);
    this.handleSignupFullNameChange = this.handleSignupFullNameChange.bind(this);
  }

  render() {
    const childToRender = this.props.isLogin ?
      <Login
        username={}
        password={}
        handleUsernameChange={handleLoginUsernameChange}
        handlePasswordChange={handleLoginPasswordChange}
      /> : <Signup
        username={}
        password={}
        fullName={}
        handleUsernameChange={handleSignupUsernameChange}
        handlePasswordChange={handleSignupPasswordChange}
        handlefullNameChange={handleSignupfullNameChange}
      />;

    return (
      <div>
        <button onClick={}>
          Signup
        </button>
        <button onClick={}>
          Login
        </button>
        {childToRender}
      </div>
    );
  }
}

function handleLoginUsernameChange(e) {

}
function handleLoginPasswordChange(e) {

}
function handleSignupUsernameChange(e) {

}
function handleSignupPasswordChange(e) {

}
function handleSignupfullNameChange(e) {

}

function mapStateToProps({loggedIn}) {
  return {
    loggedIn,
    isLogin,
  };
}
function mapDispatchToProps({loggedIn}) {
  return {
    loggedIn,
  };
}

Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default Auth;