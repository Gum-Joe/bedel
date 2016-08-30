// Counter reducer for counting
import { PLUS, MINUS } from '../util/constants';

// Intial state
const intial = {
  unreadNotifications: 0,
  unseenTasks: 0
};

// Reducer
export const counter = (state = intial, action) => {
  switch (action.type) {
    case PLUS: {
      const newState = Object.assign({}, state);
      newState[action.prop] += action.increment || 1;
      return newState;
    }
    case MINUS: {
      const newState = Object.assign({}, state);
      newState[action.prop] -= action.increment || 1;
      return newState;
    }
    default:
    return state;
  }
};
