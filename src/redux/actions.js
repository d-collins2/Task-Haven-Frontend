import { UPDATE_USER, LOGIN, TEAM_PAGE, LOGOUT, UPDATE_BOARD, UPDATE_LISTS, DELETE_TASK} from "./types.js"

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

export function deleteTask(src){
  return {
    type: DELETE_TASK,
    payload: src
  }
}

export function updateTeamId(src){
  return {
    type: TEAM_PAGE,
    payload: src
  }
}

export function updateBoard(src){
  return {
    type: UPDATE_BOARD,
    payload: src
  }
}
export function updateLists(src){
  return {
    type: UPDATE_LISTS,
    payload: src
  }
}
