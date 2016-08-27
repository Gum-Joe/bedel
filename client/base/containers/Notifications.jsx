// Notifications sidebar
import { connect } from 'react-redux';
import { Notifications as NotificationsBar } from '../components/notifications';
import { notifications, counter } from '../actions';

// Map state to props
function mapStateToProps(state) {
  return {
    notifications: state.notifications,
    counter: state.counter
  };
}

export const Notifications = connect(
  mapStateToProps,
  (dispatch) => {
    return Object.assign(
      {},
      notifications(dispatch),
      counter(dispatch)
    );
  }
)(NotificationsBar);
