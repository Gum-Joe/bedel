// App container
import { connect } from 'react-redux';
import { Dashboard } from '../components/root';
import { notifications, status, user } from '../actions';

// Map state to props
function mapStateToProps(state) {
  return {
    notifications: state.notifications,
    status: state.status,
    user: state.user
  };
}

export const App = connect(
  mapStateToProps,
  (dispatch) => {
    return Object.assign(
      {},
      notifications(dispatch),
      status(dispatch),
      user(dispatch)
    );
  }
)(Dashboard);
