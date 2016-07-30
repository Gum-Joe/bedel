// Entry file for react
// Polyfill
import 'babel-polyfill';
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'hamburgers/dist/hamburgers.min.css';

// Bootstrap plugins
import 'bootstrap/dist/js/bootstrap.min.js';

// The actual code
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
