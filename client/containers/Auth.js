import React from 'react';
import { connect } from 'react-redux';
import { updateFieldValue, changeFormType, sendLoginToServer, sendSignupToServer } from '../actions/UserLoginActions';

import Login from '../components/Login';
import Signup from '../components/Signup';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignupSubmit = this.props.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.props.handleLoginSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
<<<<<<< HEAD
    
=======
>>>>>>> 66a499b2f6191d9d6272b1fe78aeb3caa17892fd
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
      />;

    return (
      <div>
        <button onClick={() => this.props.handleFormChange('signup')}>
          Signup
        </button>
        <button onClick={() => this.props.handleFormChange('login')}>
          Login
        </button>
        {childToRender}
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