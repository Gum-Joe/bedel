// Notification actions
import { ADD_TASK, CANCEL_TASK, PAUSE_TASK, REMOVE_TASK, RUN_TASK  } from '../util/constants';

export const tasks = (dispatch) => {
  return {
    add: (task) => dispatch({
      type: ADD_TASK,
      task
    }),

    cancel: (task) => dispatch({
      type: CANCEL_TASK,
      task
    }),

    pause: (task) => dispatch({
      type: PAUSE_TASK,
      task
    }),

    remove: (task) => dispatch({
      type: REMOVE_TASK,
      task
    }),

    run: (task) => dispatch({
      type: RUN_TASK,
      task
    })
  };
};
