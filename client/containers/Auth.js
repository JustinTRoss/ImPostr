import React from 'react';
import { connect } from 'react-redux';
import { updateFieldValue, updateFormType, sendLoginToServer, sendSignupToServer } from '../actions/UserLoginActions';

import Login from '../components/Login';
import Signup from '../components/Signup';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignupSubmit = this.props.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.props.handleLoginSubmit.bind(this);
  }

  render() {
    const childToRender = this.props.isLogin ?
      <Login
        username={this.props.login.username}
        password={this.props.login.password}
        handleFieldChange={e => this.props.handleFieldChange('login', e)}
        handleLoginSubmit={this.handleLoginSubmit}
      /> : <Signup
        username={this.props.signup.username}
        password={this.props.signup.password}
        fullName={this.props.signup.fullName}
        handleFieldChange={e => this.props.handleFieldChange('signup', e)}
        handleSignupSubmit={this.handleSignupSubmit}

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

const mapStateToProps = ({userLogin}) => {
  return {
    login: userLogin.login,
    signup: userLogin.signup,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (formType) => {
      dispatch(updateFormType(formType));
    },
    handleFieldChange: (formName, e) => {
      dispatch(updateFieldValue(formName, e.target.name, e.target.value));
    },
    handleLoginSubmit: () => {
      //this reference lost - Fix manana
      dispatch(sendLoginToServer(this.props.login.username, this.props.login.password)); 
    },
    handleSignupSubmit: () => {
      //this reference lost - Fix manana
      dispatch(sendSignupToServer(this.props.signup.username, this.props.signup.password, this.props.signup.fullName)); 
    },

  };
}

Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default Auth;