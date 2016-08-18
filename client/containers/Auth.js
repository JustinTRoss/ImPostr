import React from 'react';
import { connect } from 'react-redux';
import { updateFieldValue, changeFormType, sendLoginToServer, sendSignupToServer } from '../actions/UserLoginActions';
import Splash from '../components/Splash';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


class Auth extends React.Component {
  constructor(props) {
    super(props);

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
      }
    };
  }

  handleFieldChange(form, field, value) {
    const temp = this.state[form];
    temp[field] = value;
    this.setState(temp);
  }

  render() {
    const showLogout = this.props.loggedIn ? 'Logout' : 'Log In';
    let childToRender = this.props.isLogin === 'login' ?
      <Login
        username={this.state.login.username}
        password={this.state.login.password}
        handleFieldChange={e => this.handleFieldChange('login', e.target.name, e.target.value)}
        handleLoginSubmit={() => this.handleLoginSubmit(this.state.login)}
      /> : <Signup
        username={this.state.signup.username}
        password={this.state.signup.password}
        handleFieldChange={e => this.handleFieldChange('signup', e.target.name, e.target.value)}
        handleSignupSubmit={() => {
          this.handleSignupSubmit(this.state.signup);
        }}
      />;

    let textToRender = (this.props.isLogin) === 'login' ?
      <div className="splashSwitchAuthText">
        Do you want to feel like Evan?
        <a onClick={() => this.props.handleFormChange('signup')}>Sign up today!</a>
      </div>
      :
      <div className="splashSwitchAuthText">
        Already enjoying yourself?
        <a onClick={() => this.props.handleFormChange('login')}>Log in now!</a>
      </div>;

    return (
      <div id='content'>
        <Navbar receiveLogout={this.props.receiveLogout} showLogout={showLogout} />
      <div className="AuthAndSplash">
        <div id="splashBox">
        <Splash />
          <div id="authBox">
            {childToRender}
            {textToRender}
          </div>
        </div>
      </div>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.userLogin.login,
    signup: state.userLogin.signup,
    isLogin: state.userLogin.isLogin,
  };
}

const mapDispatchToProps = dispatch => {
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
