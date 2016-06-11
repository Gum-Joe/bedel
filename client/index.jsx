// Polyfill
import 'babel-polyfill';
// Entry file for react
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Dashboard } from './dashboard.jsx';
import { DashboardApp } from './components/app';
// Default app to launch
const DefaultApp = DashboardApp;

$(document).ready(function() {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={Dashboard}>
        <IndexRoute component={DashboardApp}/>
      </Route>
    </Router>
  ), document.getElementById('main'));
});
