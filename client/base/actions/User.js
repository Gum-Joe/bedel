// User actions
import { LOG_IN, LOG_OUT } from '../util/constants';

export const user = (dispatch) => {
  return {
    login: (user) => dispatch({
      type: LOG_IN,
      user
    }),

    logout: (user) => dispatch({
      type: LOG_OUT,
      user
    })
  };
};
