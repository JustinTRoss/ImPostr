import React from 'react';
import { connect } from 'react-redux';
import { checkJWTWithServer } from '../actions/UserLoginActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Auth from './Auth';


class App extends React.Component {
  constructor(props) {
    super(props);
    // this.checkJWT = this.props.checkJWT.bind(this);
  }

  componentWillMount() {
    this.props.checkJWT();
  }

  render() {
    const childToRender = this.props.loggedIn ? <Home /> : <Auth />;
          // {childToRender}

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
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;