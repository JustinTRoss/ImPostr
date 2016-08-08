import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import configureStore from './configureStore';


// Check JWT here, and then perform the necessaries:

let store = createStore(app, window.STORE_FROM_SERVER);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
