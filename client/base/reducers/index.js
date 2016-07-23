// Index of redux reducers
import { combineReducers } from 'redux';
import { user } from './User';
import { notifications } from './Notifications';
import { status } from './Status';
import { tasks } from './Tasks';

// Object to export
const reducers = combineReducers({
  notifications,
  status,
  tasks,
  user
});

// Export
export default reducers;
