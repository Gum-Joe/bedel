// Notification Component
/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import Push from 'push.js';
import createHTML from '../util/html';
import { SidebarItem } from './navbar/sidebar';
import io from 'socket.io-client';
import '../../sass/notifications.scss';

// Component
export const Notifications = React.createClass({
  propTypes: {
    add: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired
  },
  componentDidMount() {
    this.socket = io.connect('/');
    // Wacth for notification event
    this.socket.on('notification', (notification) => {
      // From http://stackoverflow.com/questions/1760250/how-to-tell-if-browser-tab-is-active (document.hidden)
      console.log(document.visibilityState);
      if (document.hidden) {
        Push.create(notification.app, {
          body: notification.body,
          icon: notification.icon
        });
      }
      this.props.add(notification);
    });
  },
  render() {
    return (
      <div>
        <div className="notify-header">
          <h3>
            <button onClick={() => this.props.updateStatus({ sidebar: { open: false, alreadyOpened: true } })} className="not-a-button close-notify-bar">
              <span>&times;</span>
            </button> Notifications
          </h3>
          <button onClick={() => this.props.removeAll()} id="clear-notify">
            <span>&times;</span> Clear all
          </button>
        </div>
        {
          this.props.notifications.map((notific) => {
            return (
              <SidebarItem key={notific.id}>
                {/* Helped by http://stackoverflow.com/questions/9201756/how-to-put-img-inline-with-text */}
                <div>
                  <img src={notific.icon} alt="presentation" /> <h4 dangerouslySetInnerHTML={createHTML(notific.app + ':')} /> <h6 dangerouslySetInnerHTML={createHTML(notific.body)} />
                  <div
                    className="dismiss-notify" onClick={() => this.props.remove(notific)}
                  >
                    <span>&times;</span>
                  </div>
                </div>
              </SidebarItem>
            );
          })
        }
      </div>
    );
  }
});
