import { UPDATE_USER, LOGIN, TEAM_PAGE, LOGOUT, DELETE_LIST } from "./types.js"

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

export function deleteList(src){
  return {
    type: DELETE_LIST,
    payload: src
  }
}

export function updateTeamId(src){
  return {
    type: TEAM_PAGE,
    payload: src
  }
}
