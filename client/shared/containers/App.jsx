// User container
import { connect } from 'react-redux';
import { Dashboard } from '../components/root';

// Map state to props
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const App = connect(
  mapStateToProps
)(Dashboard);
