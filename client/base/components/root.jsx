// JSX file for dashboard (root)
import React, { PropTypes } from 'react';
import ajax from '@fdaciuk/ajax';
import { LOG_IN } from '../util/constants';
import { Notifications } from '../containers/Notifications';
import { PageBody } from './body';
import { SidebarNav } from './navbar';
// CSS
import '../../sass/dashboard.scss';
import '../../sass/theme.dashboard.scss';

// Class
export const Dashboard = React.createClass({
  // Proptypes
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    user: PropTypes.object
  },

  componentDidMount() {
    console.log("Logging in...");
    // Login
    const userReq = ajax({
      method: 'GET',
      url: '/api/session/user'
    });
    userReq.then((res) => {
      this.props.dispatch({ type: LOG_IN, user: res});
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
        <div className="off-canvas">
          {/* Off convas */}
          <Notifications />
        </div>
      </main>
    );
  }
});
