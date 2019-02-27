import { UPDATE_USER, LOGIN, ADD_BOARD, TEAM_PAGE, LOGOUT } from "./types.js"



export function updateUserAction(src) {
  return {
    type: UPDATE_USER,
    payload: src,
  }
}

export function updateCurrentUserAction(src){
  return {
    type: LOGIN,
    payload: src
  }
}

export function logout(){
  return {
    type: LOGOUT
  }
}

export function addBoard(src){
  return {
    type: ADD_BOARD,
    payload: src
  }
}

export function updateTeamId(src){
  return {
    type: TEAM_PAGE,
    payload: src
  }
}
