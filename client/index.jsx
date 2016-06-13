// Polyfill
import 'babel-polyfill';
// Entry file for react
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { routes } from './routes';
import reducers from './redux/reducers';

const store = createStore(reducers);
render((
  <Provider store={store}>
    {routes}
  </Provider>
), document.getElementById('main'));
