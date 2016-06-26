// Index of redux reducers
import { combineReducers } from 'redux';
import { user } from './User';
import { notifications } from './Notifications';

// Object to export
const reducers = combineReducers({
  user,
  notifications
});

// Export
export default reducers;
