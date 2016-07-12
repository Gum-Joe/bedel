// Notifications reducer
import { ADD_NOTIFY, REMOVE_NOTIFY } from '../util/constants';

// ID for next notification
let nextNotificationId = 1;

// Reducer
export const notifications = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFY:
      return [
        ...state,
        Object.assign({ id: nextNotificationId++ }, action.notification)
      ];
    case REMOVE_NOTIFY:
      return state.filter(n => {
        return n.id !== action.notification.id;
      });
    default:
      return state;

  }
};
