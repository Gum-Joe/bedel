// User sctions
import { LOG_IN, LOG_OUT } from '../util/constants';

export const login = (user) => {
  return {
    type: LOG_IN,
    user
  };
};

export const logout = (user) => {
  return {
    type: LOG_OUT,
    user
  };
};
