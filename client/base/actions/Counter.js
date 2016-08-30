// Counter actions
import { PLUS, MINUS } from '../util/constants';

export const counter = (dispatch) => {
  return {
    plus: (prop, increment = 1) => dispatch({
      type: PLUS,
      prop: prop,
      increment: increment
    }),

    minus: (prop, increment = 1) => dispatch({
      type: MINUS,
      prop: prop,
      increment: increment
    })
  };
};
