import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Auth from '../components/Auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('props ' , props);
  }

  render() {
    //const childToRender = {isAuth} ? <Home /> : <Auth />;
    // {childToRender}

    return (
      <div>App
        <Navbar />
        <Home />
        <Footer />
      </div>
		)
	}
}

function mapStateToProps(state) {
  const loggedIn = state.platformList;
  return loggedIn;
}

App = connect(mapStateToProps)(App);

export default App;