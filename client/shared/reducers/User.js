// User reducer
import { LOG_IN, LOG_OUT } from '../util/constants/index';

// Intial state for redux
const intial = {
  id: 0,
  username: null,
  name: null
};

// Reducer
export const user = (state = intial, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        id: action.user._id,
        username: action.user.username,
        name: action.user.name || action.user.username,
        email: action.user.email
      };
    case LOG_OUT:
      return intial;
    default:
      return state;

  }
};
