// Notification actions
import { ADD_NOTIFY, REMOVE_NOTIFY, REMOVE_ALL_NOTIFY } from '../util/constants';

export const notifications = (dispatch) => {
  return {
    add: (notification) => dispatch({
      type: ADD_NOTIFY,
      notification
    }),

    remove: (notification) => dispatch({
      type: REMOVE_NOTIFY,
      notification
    }),

    removeAll: () => dispatch({
      type: REMOVE_ALL_NOTIFY
    })
  };
};
