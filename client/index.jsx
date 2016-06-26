// Polyfill
import 'babel-polyfill';
// Entry file for react
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { routes } from './routes';
import configureStore from './base/store/configureStore';

const store = configureStore();
render((
  <Provider store={store}>
    {routes}
  </Provider>
), document.getElementById('main'));
