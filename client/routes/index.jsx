// Routes
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Dashboard } from '../dashboard.jsx';
import { DashboardApp } from '../components/app';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard}>
      <IndexRoute component={DashboardApp} />
    </Route>
  </Router>
);
