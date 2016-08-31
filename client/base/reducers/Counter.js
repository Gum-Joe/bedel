// Counter reducer for counting
import { PLUS, MINUS } from '../util/constants';

// Intial state
const intial = {
  unreadNotifications: 0,
  unseenTasks: 0
};

// Reducer
export const counter = (state = intial, action) => {
  /**
   * Do a sum
   *
   * @param oldState {Object} current state
   * @param prop {String} prop of oldState to change
   * @param int {Number} number to add (positive or negative)
   * @return {Object} new state
   */
  const doSum = (oldState, prop, int) => {
    const newState = Object.assign({}, oldState);
    newState[action.prop] += int;
    return newState;
  };

  // Reducer logic
  switch (action.type) {
    case PLUS: {
      return doSum(state, action.prop, action.increment || 1);
    }
    case MINUS: {
      return doSum(state, action.prop, -action.increment || -1);
    }
    default:
      return state;
  }
};
