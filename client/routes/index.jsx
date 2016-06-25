// Routes
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from '../shared/containers/App';
import { DashboardApp } from '../dashboard';
import { ErrorPage } from './error';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={DashboardApp} />
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>
);
