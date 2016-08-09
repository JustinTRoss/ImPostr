import React from 'react';
import { connect } from 'react-redux';
<<<<<<< c9ca0cf8f08f9de96d12962254e525afd5a2c28a
import { updateFieldValue, changeFormType, sendLoginToServer, sendSignupToServer } from '../actions/UserLoginActions';
=======
import { updateFieldValue, updateFormType, sendLoginToServer, sendSignupToServer } from '../actions/UserLoginActions';
>>>>>>> Allow users to sign in and sign out - actions still not found

import Login from '../components/Login';
import Signup from '../components/Signup';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignupSubmit = this.props.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.props.handleLoginSubmit.bind(this);
<<<<<<< c9ca0cf8f08f9de96d12962254e525afd5a2c28a
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
=======
>>>>>>> Allow users to sign in and sign out - actions still not found
  }

  render() {
    console.log(this.props);
    console.log(this.state.signup);

    let childToRender = this.props.isLogin === 'login' ?
      <Login
<<<<<<< c9ca0cf8f08f9de96d12962254e525afd5a2c28a
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

>>>>>>> Allow users to sign in and sign out - actions still not found
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

<<<<<<< c9ca0cf8f08f9de96d12962254e525afd5a2c28a
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
=======
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
>>>>>>> Allow users to sign in and sign out - actions still not found
    },

  };
}

Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default Auth;