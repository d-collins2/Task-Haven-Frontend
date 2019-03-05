import { UPDATE_USER, LOGIN, LOGOUT, DELETE_LIST, REMOVE_TASK } from './types.js'

const initialState = {
  currentUser: null,
  userSrc: null,
  teamId: null
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      return { ...state, userSrc: action.payload};
    case REMOVE_TASK:
      return { ...state, userSrc: action.payload};

    case LOGIN:
      return {...state, currentUser: action.payload}
    case LOGOUT:
      return {...state, currentUser: null}
    case DELETE_LIST:
      return
    default:
      return state;
  }
}
