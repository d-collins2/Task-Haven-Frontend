import {
  LOGIN,
  LOGOUT,
  UPDATE_BOARD,
  UPDATE_LISTS} from './types.js'

const initialState = {
  currentUser: null,
  board: null,
  task: null,
  lists: null
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {...state, currentUser: action.payload}
    case LOGOUT:
      return {...state, currentUser: null}
    case UPDATE_BOARD:
      return {...state, board: action.payload}
    case UPDATE_LISTS:
      return {...state, lists: action.payload}
    default:
      return state;
  }
}
