import React from 'react';
import Home from './Home';
import Auth from '../containers/Auth';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { checkJWT } = this.props;
    checkJWT();
  }

  render() {
    const childToRender = this.props.loggedIn ? <Home /> : <Auth />;
    document.body.className = this.props.loggedIn ? 'plain' : 'space';

    return (
      <div id="App">
        {childToRender}
      </div>
    );
  }
}

export default App;
