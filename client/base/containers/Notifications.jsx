// Notifications sidebar
import { connect } from 'react-redux';
import { Notifications as NotificationsBar } from '../components/notifications';

// Map state to props
function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

export const Notifications = connect(
  mapStateToProps
)(NotificationsBar);
