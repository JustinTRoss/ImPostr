import React from 'react';
import { connect } from 'react-redux';
import { updateFieldValue, changeFormType, sendLoginToServer, sendSignupToServer } from '../actions/UserLoginActions';

import Login from '../components/Login';
import Signup from '../components/Signup';

class Auth extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< 67239dfa5ccfb2c8554cf42aa6882dfb22a8381c

    this.handleSignupSubmit = this.props.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.props.handleLoginSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
      login: {
        username: '',
        password: '',
      },
      signup: {
        username: '',
        password: '',
        fullName: '',
      }
    };
  }

  handleFieldChange(form, field, value) {
    const temp = this.state[form];
    temp[field] = value;
    console.log(temp);
    this.setState(temp);
  }

  render() {
    console.log(this.props);
    console.log(this.state.signup);

    let childToRender = this.props.isLogin === 'login' ?
      <Login
        username={this.state.login.username}
        password={this.state.login.password}
        handleFieldChange={e => this.handleFieldChange('login', e.target.name, e.target.value)}
        handleLoginSubmit={() => this.handleLoginSubmit(this.state.login)}
      /> : <Signup
        username={this.state.signup.username}
        password={this.state.signup.password}
        fullName={this.state.signup.fullName}
        handleFieldChange={e => this.handleFieldChange('signup', e.target.name, e.target.value)}
        handleSignupSubmit={() => {
          console.log(this.handleSignupSubmit);
          this.handleSignupSubmit(this.state.signup);
        }}
=======
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
>>>>>>> Implement broken auth
      />;

    return (
      <div>
<<<<<<< 67239dfa5ccfb2c8554cf42aa6882dfb22a8381c
        <button onClick={() => this.props.handleFormChange('signup')}>
          Signup
        </button>
        <button onClick={() => this.props.handleFormChange('login')}>
=======
        <button onClick={isLogin = false}>
          Signup
        </button>
        <button onClick={isLogin = true}>
>>>>>>> Implement broken auth
          Login
        </button>
        {childToRender}
      </div>
    );
  }
}

<<<<<<< 67239dfa5ccfb2c8554cf42aa6882dfb22a8381c

const mapStateToProps = state => {
  return {
    login: state.userLogin.login,
    signup: state.userLogin.signup,
    isLogin: state.userLogin.isLogin,
  };
}

const mapDispatchToProps = dispatch => {
=======
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
>>>>>>> Implement broken auth
  return {
    handleFormChange: formType => {
      dispatch(changeFormType(formType));
    },
    handleLoginSubmit: formData => {
      //this reference lost - Fix manana
      dispatch(sendLoginToServer(formData)); 
    },
    handleSignupSubmit: formData => {
      //this reference lost - Fix manana
      dispatch(sendSignupToServer(formData)); 
    },

  };
}

Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default Auth;