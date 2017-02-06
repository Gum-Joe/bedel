// Entry file for react
// Polyfill
import 'babel-polyfill';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'hamburgers/dist/hamburgers.min.css';

// Bootstrap plugins
import 'bootstrap/dist/js/bootstrap.min.js';

// Router
import { Router, Route, Redirect, browserHistory } from 'react-router';

// The actual code
import React from 'react';
import AppContainer from './base/components/app-container';
import { Body } from './base/components/main';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './base/store/configureStore';

const store = configureStore();
/**
 * Setup hierarchy
 * <Body />: component with navigation, header and footer
 * <AppContainer />: component which contains the running application
 */
render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/apps/dashboard" />
      <Route path="/" component={Body}>
        <Route path="apps" component={AppContainer}>
          <Route path=":app" />
          <Route path=":app/:approute" />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('main'));
