// Index of redux reducers
import { combineReducers } from 'redux';
import { user } from './User';
import { notifications } from './Notifications';
import { status } from './Status';
import { tasks } from './Tasks';
import { counter } from './Counter';

// Object to export
const reducers = combineReducers({
  counter,
  notifications,
  status,
  tasks,
  user
});

// Export
export default reducers;
