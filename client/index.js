import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';
import configureStore from './configureStore';

const Appy = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

const store = configureStore();

render(
  <Provider store={store}>
    <Appy />
  </Provider>,
  document.getElementById('root')
);
