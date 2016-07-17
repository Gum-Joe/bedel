// Notifications sidebar
import { connect } from 'react-redux';
import { Sidebar as RawSidebar } from '../components/sidebar';
import { status as mapDispatchToProps } from '../actions';

// Map state to props
function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawSidebar);
