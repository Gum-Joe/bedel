// Reducer for the status of components
import { UPDATE_STATUS } from '../util/constants';

// Initial status
const initial = {
  sidebar: {
    open: false,
    alreadyOpened: false
  }
};

export const status = (state = initial, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return Object.assign(state, action.state);
    default:
      return state;
  }
};
