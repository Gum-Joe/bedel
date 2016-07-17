// JSX file for dashboard (root)
import React, { PropTypes } from 'react';
import ajax from '@fdaciuk/ajax';
import { Sidebar } from '../containers/Sidebar';
import { PageBody } from './body';
import { SidebarNav } from './navbar';
// CSS
import '../../sass/dashboard.scss';
import '../../sass/theme.dashboard.scss';

// Class
export const Dashboard = React.createClass({
  // Proptypes
  propTypes: {
    children: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
    user: PropTypes.object,
    updateStatus: PropTypes.func.isRequired
  },

  componentDidMount() {
    console.log("Logging in...");
    // Login
    const userReq = ajax({
      method: 'GET',
      url: '/api/session/user'
    });
    userReq.then((res) => {
      this.props.login(res);
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
        <PageBody user={this.props.user} status={this.props.status} updateStatus={this.props.updateStatus}>
          {this.props.children}
        </PageBody>
        <div className="off-canvas">
          {/* Off convas */}
          <Sidebar />
        </div>
      </main>
    );
  }
});
