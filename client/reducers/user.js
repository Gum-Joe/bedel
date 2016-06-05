// User reducer
import { UPDATE_USER, DELETE_USER } from '../constants/redux';

// Intial state for redux
const intial = [
  {
    id: 0,
    username: null,
    name: null
  }
];

// Reducer
export default function user(state = intial, action) {
  switch (action.type) {
    case UPDATE_USER:
      return [
        {
          id: action.id,
          username: action.username,
          name: action.name || action.username
        },
        ...state
      ];
      case DELETE_USER:
        return [
          {
            id: action.id,
            username: action.username,
            name: action.name || action.username
          },
          ...state
        ];
    default:
      return state;

  }
}
