import { UPDATE_USER, LOGIN, TEAM_PAGE, LOGOUT } from './types.js'

const initialState = {
  currentUser: null,
  userSrc: null,
  teamId: null
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      return { ...state, userSrc: action.payload};
    case LOGIN:
      return {...state, currentUser: action.payload}
    case LOGOUT:
      return {...state, currentUser: null}
    case TEAM_PAGE:
      return {...state, teamId: action.payload}
    default:
      return state;
  }
}
