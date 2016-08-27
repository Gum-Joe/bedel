// Notification Component
/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import Push from 'push.js';
import createHTML from '../util/html';
import { Link } from 'react-router';
import { SidebarItem } from './navbar/sidebar';
import { SidebarHeader as Header } from './sidebar/header';
import io from 'socket.io-client';
import '../../sass/notifications.scss';

// Socket
const socket = io.connect('/');

// Component
export const Notifications = React.createClass({
  propTypes: {
    add: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
    plus: PropTypes.func.isRequired,
    minus: PropTypes.func.isRequired
  },
  componentDidMount() {
    // Fetch from db
    // this.getFromDB();
    // Wacth for notification event
    socket.on('notification', (notification) => {
      const date = new Date();
      // Notification + date
      let mins = date.getMinutes();
      if (mins < 10) {
        mins = `0${mins}`;
      }
      let hrs = date.getHours();
      if (hrs < 10) {
        hrs = `0${mins}`;
      }
      const dateString = `${hrs}:${mins}`;
      const notificationShown = Object.assign({
        date: dateString
      }, notification);
      this.addNotification(notificationShown);
    });
  },
  getFromDB() {
    // Request current notifications
    socket.emit('get-notifications', {});
    socket.on(
      'db-notfications',
      notifications => notifications.forEach(notification => this.addNotification(notification, true))
    );
  },
  addNotification(notification, noPlus = false) {
    // Check if not in already
    if (!this.notificationsIncludesID(notification)) {
      this.props.add(notification);
      // From http://stackoverflow.com/questions/1760250/how-to-tell-if-browser-tab-is-active (document.hidden)
      if (document.hidden) {
        Push.create(notification.app, {
          body: notification.body,
          icon: notification.icon
        });
      }
      if (!this.props.status.sidebar.open && !noPlus) {
        this.props.plus('unreadNotifications');
      }
    }
  },
  notificationsIncludesID(notification) {
    for (let i of this.props.notifications) {
      console.log(i);
      if (i.id === notification.id) {
        return true;
      }
    }
    return false;
  },
  render() {
    return (
      <div className="notifications-bar-body">
        <Header header="Notifications" status={this.props.status} updateStatus={this.props.updateStatus}>
          <button
            onClick={() => {
              this.props.removeAll();
              this.props.updateStatus({
                sidebar: Object.assign(this.props.status.sidebar, { open: false, alreadyOpened: true })
              });
              socket.emit('remove-all-notifications', {});
            }}
            id="clear-notify"
          >
            <span>&times;</span> Clear all
          </button>
        </Header>
        {
          this.props.notifications.length > 0 ?
          this.props.notifications.map((notific) => {
            return (
              <SidebarItem key={notific.id} noLink>
                {/* Helped by http://stackoverflow.com/questions/9201756/how-to-put-img-inline-with-text */}
                <div>
                  <img
                    src={notific.icon}
                    alt="presentation"
                  /> <h4>
                    <p dangerouslySetInnerHTML={createHTML(notific.app)} />
                    <div
                      className="dismiss-notify" onClick={
                        () => {
                          socket.emit('dismiss-notification', notific);
                          this.props.remove(notific);
                        }
                      }
                    >
                      <button>&times;</button>
                    </div>
                    {
                      notific.hasOwnProperty('link') || notific.hasOwnProperty('reactLink') ?
                        <div className="notification-view-more">
                          {notific.hasOwnProperty('link') ?
                            <a alt-text="View More" href={notific.link} className="material-icons">arrow_forward</a>
                            : null
                          }
                          {notific.hasOwnProperty('reactLink') ?
                            <Link alt-text="View More" to={notific.reactLink} className="material-icons">arrow_forward</Link>
                            : null
                          }
                        </div>
                        : null
                    }
                    <div className="time-notify">
                      <h6>{notific.date}</h6>
                    </div>
                  </h4>
                  <div className="notification-body"><h5 dangerouslySetInnerHTML={createHTML(notific.body)} /></div>
                </div>
              </SidebarItem>
            );
          }) : <div className="container no-notifications-tasks"><h4>No new notifications</h4></div>
        }
      </div>
    );
  }
});
