import {
  LOGIN,
  LOGOUT,
  UPDATE_BOARD,
  UPDATE_LISTS,
  DELETE_TASK,
  UPDATE_TASK } from "./types.js"

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

export function updateTask(src){
  return {
    type: UPDATE_TASK,
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
