import React from 'react';
import { connect } from 'react-redux';
import { checkJWTWithServer } from '../actions/UserLoginActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Auth from './Auth';
import { requestQueue } from '../actions/postQueueActions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { checkJWT, pullQueue } = this.props;
    checkJWT();
    pullQueue();
  }

  render() {
    const childToRender = this.props.loggedIn ? <Home /> : <Auth />;

    return (
      <div>App
        <Navbar />
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
    checkJWT: () => {
      dispatch(checkJWTWithServer());
    },

    pullQueue: () => {
      dispatch(requestQueue());
    },
  };
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
