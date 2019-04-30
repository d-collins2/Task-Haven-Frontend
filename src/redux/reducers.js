import {
  LOGIN,
  LOGOUT,
  UPDATE_BOARD,
  UPDATE_LISTS,
  ADD_LIST,
  DELETE_LIST } from './types.js'

const initialState = {
  currentUser: null,
  board: null,
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
    case ADD_LIST:
      return {...state, lists: [...state.lists].push(action.payload)}
    case DELETE_LIST:
      return {...state, lists: [...state.lists].filter(list => list.id !== action.payload.id )}
    default:
      return state;
  }
}
