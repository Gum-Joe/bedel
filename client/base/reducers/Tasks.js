// Tasks reducer
import { ADD_TASK, CANCEL_TASK, PAUSE_TASK, REMOVE_TASK, RUN_TASK  } from '../util/constants';
import { List } from 'immutable';

// Inita state
const intial = new List();

// reducer
export const tasks = (state = intial, action) => {
  switch (action.types) {
    case ADD_TASK:
      return state.push(action.task);
    case CANCEL_TASK:
      return state.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign(task, {
            cancelled: true
          });
        } else {
          return task;
        }
      });
    case PAUSE_TASK:
      return state.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign(task, {
            paused: true
          });
        } else {
          return task;
        }
      });
    case REMOVE_TASK:
      return state.filter(task => {
        return task.id !== action.task.id;
      });
    case RUN_TASK:
    return state.map((task) => {
      if (task.id === action.task.id) {
        return Object.assign(task, {
          paused: false
        });
      } else {
        return task;
      }
    });
    default:
      return state;

  }
};
