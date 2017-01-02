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
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// The actual code
import React from 'react';
import { Body } from './base/components/main.jsx';
import { AppContainer } from './base/components/app-container.jsx';
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
      <Route path="/" component={Body}>
        <IndexRoute component={AppContainer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('main'));
