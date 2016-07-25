// Tasks reducer
import { ADD_TASK, CANCEL_TASK, PAUSE_TASK, REMOVE_TASK, RUN_TASK, UPDATE_TASK  } from '../util/constants';

// Inita state
const intial = [];

// reducer
export const tasks = (state = intial, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        Object.assign({}, action.task)
      ];
    case CANCEL_TASK: {
      const newState = Array.concat(state);
      return newState.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign(task, {
            cancelled: true,
            status: 'Cancelling...',
            percentage: 1
          });
        } else {
          return task;
        }
      });
    }
    case PAUSE_TASK: {
      const newState = Array.concat(state);
      return newState.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign(task, {
            paused: true
          });
        } else {
          return task;
        }
      });
    }
    case REMOVE_TASK: {
      const newState = Array.concat(state);
      return newState.filter(task => {
        return task.id !== action.task.id;
      });
    }
    case RUN_TASK: {
      const newState = Array.concat(state);
      return newState.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign(task, {
            paused: false
          });
        } else {
          return task;
        }
      });
    }
    case UPDATE_TASK: {
      const newState = Array.concat(state);
      return newState.map((task) => {
        if (task.id === action.task.id) {
          return Object.assign(task, action.task);
        } else {
          return task;
        }
      });
    }
    default:
      return state;

  }
};
