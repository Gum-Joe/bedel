// Index of redux reducers
import { combineReducers } from 'redux';
import { user } from './User';
import { notifications } from './Notifications';
import { status } from './Status';

// Object to export
const reducers = combineReducers({
  notifications,
  status,
  user
});

// Export
export default reducers;
