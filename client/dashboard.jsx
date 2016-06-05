// JSX file for dashboard
import React, { Component } from 'react';
import { Nav } from './components/navbar';
import { PageBody } from './components/body';
// CSS
import './sass/dashboard.scss';
import './sass/theme.dashboard.scss';

export class Dashboard extends Component {
  render() {
    return (
      <main>
        <Nav />
        <PageBody />
      </main>
    );
  }
}