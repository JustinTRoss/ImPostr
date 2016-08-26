import React from 'react';
import Home from './Home';
import Auth from '../containers/Auth';

class App extends React.Component {
  componentWillMount() {
    const { checkJWT } = this.props;
    checkJWT();
  }

  render() {
    const { loggedIn, requestLogout, requestingStart } = this.props;
    let childToRender;

    if (loggedIn) {
      childToRender = <Home requestLogout={requestLogout} />
    } else if (requestingStart) {
      childToRender = <div></div>;
    } else {
      childToRender = <Auth />;
    }

    return (
      <div id="App">
        {childToRender}
      </div>
    );
  }
}

export default App;
