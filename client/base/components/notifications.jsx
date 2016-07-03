// Notification Component
import React, { PropTypes } from 'react';
import { Sidebar, SidebarItem } from './navbar/sidebar';
import { ADD_NOTIFY, REMOVE_NOTIFY } from '../util/constants';
import io from 'socket.io-client';
import '../../sass/notifications.scss';

// Component
export const Notifications = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
  },
  componentDidMount() {
    this.socket = io.connect('/');
    // Wacth for notification event
    this.socket.on('notification', (notification) => {
      this.props.dispatch({
        type: ADD_NOTIFY,
        notification: notification
      });
    });
  },
  render() {
    return (
      <div>
        <Sidebar appendClass="notifications-bar">
          <SidebarItem><h1>T</h1></SidebarItem>
        </Sidebar>
      </div>
    );
  }
});
