import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppContainer from './containers/AppContainer';
import configureStore from './configureStore';

const Appy = () => (
  <MuiThemeProvider>
    <AppContainer />
  </MuiThemeProvider>
);

const store = configureStore();

render(
  <Provider store={store}>
    <Appy />
  </Provider>,
  document.getElementById('root')
);
