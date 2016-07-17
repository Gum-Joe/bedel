// Notification actions
import { UPDATE_STATUS } from '../util/constants';

export const status = (dispatch) => {
  return {
    updateStatus: (state) => dispatch({
      type: UPDATE_STATUS,
      state
    })
  };
};
