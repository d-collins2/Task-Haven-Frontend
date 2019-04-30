import {
  LOGIN,
  LOGOUT,
  UPDATE_BOARD,
  UPDATE_LISTS,
  ADD_LIST,
  DELETE_LIST } from "./types.js"

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

export function updateBoard(src){
  return {
    type: UPDATE_BOARD,
    payload: src
  }
}

export function addList(src){
  return {
    type: ADD_LIST,
    payload: src
  }
}
export function deleteList(src){
  return {
    type: DELETE_LIST,
    payload: src
  }
}

export function updateLists(src){
  return {
    type: UPDATE_LISTS,
    payload: src
  }
}
