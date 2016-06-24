// Notifications reducer
import { ADD_NOTIFY, REMOVE_NOTIFY } from '../util/constants';

// ID for next notification
let nextNotificationId = 0;

// Reducer
export const notify = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFY:
      return [
        ...state,
        Object.assign({ id: nextNotificationId++ }, action.notification)
      ];
    case REMOVE_NOTIFY:
      return state.map(n => {
        if (n.id !== action.notification.id) {
          return Object.assign({}, n);
        } else {
          return null;
        }
      });
    default:
      return state;

  }
};
