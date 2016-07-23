// Tasks container
import { connect } from 'react-redux';
import { Tasks as TasksBar } from '../components/tasks';
import { tasks as mapDispatchToProps } from '../actions';

// Map state to props
function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

export const Tasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksBar);
