// Notifications reducer
import { ADD_NOTIFY, REMOVE_NOTIFY, REMOVE_ALL_NOTIFY } from '../util/constants';

// Reducer
export const notifications = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFY:
      return [
        ...state,
        action.notification
      ];
    case REMOVE_NOTIFY:
      return state.filter(n => {
        return n.id !== action.notification.id;
      });
    case REMOVE_ALL_NOTIFY:
      return [];
    default:
      return state;

  }
};
