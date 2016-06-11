// JSX file for dashboard
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { SidebarNav } from './components/navbar';
import { PageBody } from './components/body';
import DashboardApp from './components/app';
// CSS
import './sass/dashboard.scss';
import './sass/theme.dashboard.scss';
// Default app to launch
const DefaultApp = DashboardApp;

class Test extends Component {
  render() {
    return (
      <h1>h</h1>
    );
  }
}

// Class
export class Dashboard extends Component {
  render() {
    return (
      <main>
        <SidebarNav />
        <PageBody>
          {this.props.children}
        </PageBody>
      </main>
    );
  }
}
