import { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';
import Signup from '../components/Signup';

class Auth extends Component {
  constructor(props) {
    super(props);  
  }

  render() {
    // const childToRender = this.props. ? <Login /> : <Signup />;
        // {childToRender}

    return (
      <div>Auth
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loggedIn = state;
  return {
    loggedIn,
  };
}

Auth = connect(mapStateToProps)(Auth);

export default Auth;