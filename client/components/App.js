import React from 'react';
import Home from './Home';
import Auth from '../containers/Auth';

class App extends React.Component {
  componentWillMount() {
    const { checkJWT } = this.props;
    checkJWT();
  }

  render() {
    const { loggedIn, requestLogout } = this.props;
    const childToRender = loggedIn
      ? <Home requestLogout={requestLogout} />
      : <Auth />;
    document.body.className = loggedIn ? 'plain' : 'space'; //revisit by changing background of home and auth

    return (
      <div id="App">
        {childToRender}
      </div>
    );
  }
}

export default App;
