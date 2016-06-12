// User reducer
import { LOG_IN, LOG_OUT } from '../../util/constants';

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
        id: action.id,
        username: action.username,
        name: action.name || action.username
      };
      case LOG_OUT:
        return intial;
    default:
      return state;

  }
};
