// Notification Component
import React, { PropTypes } from 'react';
import Push from 'push.js';
import { SidebarItem } from './navbar/sidebar';
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
      Push.create(notification.app, {
        body: notification.body,
        icon: notification.icon
      });
      this.props.dispatch({
        type: ADD_NOTIFY,
        notification: notification
      });
    });
  },
  render() {
    return (
      <div>
        {
          this.props.notifications.map((notific) => {
            return (
              <SidebarItem key={notific.id}>
                {/* Helped by http://stackoverflow.com/questions/9201756/how-to-put-img-inline-with-text */}
                <div><img src={notific.icon} alt="presentation" /> <h4>{notific.app}:</h4> <h6>{notific.body}</h6></div>
              </SidebarItem>
            );
          })
        }
      </div>
    );
  }
});
