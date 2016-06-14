// JSX file for dashboard (root)
import React, { PropTypes } from 'react';
import ajax from '@fdaciuk/ajax';
import { SidebarNav } from './navbar';
import { PageBody } from './body';
// CSS
import '../../sass/dashboard.scss';
import '../../sass/theme.dashboard.scss';

// Class
export const Dashboard = React.createClass({
  // Proptypes
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
  },

  componentDidMount() {
    console.log("Logging in...");
    // Login
    const userReq = ajax({
      method: 'GET',
      url: '/api/session/user'
    });
    userReq.then((res) => {
      this.props.dispatch({ type: 'LOG_IN', user: res});
      console.log("Logged in.");
    }, (err) => {
      if (err) {
        throw err;
      }
    });
  },

  render() {
    return (
      <main>
        <SidebarNav />
        <PageBody user={this.props.user}>
          {this.props.children}
        </PageBody>
      </main>
    );
  }
});
