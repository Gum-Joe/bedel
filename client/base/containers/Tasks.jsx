// Tasks container
import { connect } from 'react-redux';
import { Tasks as TasksBar } from '../components/tasks';
import { tasks, counter } from '../actions';

// Map state to props
function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

export const Tasks = connect(
  mapStateToProps,
  (dispatch) => {
    return Object.assign(
      {},
      tasks(dispatch),
      counter(dispatch)
    );
  }
)(TasksBar);
