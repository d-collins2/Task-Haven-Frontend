import { UPDATE_USER, LOGIN, LOGOUT } from './types.js'

const initialState = {
  currentUser: null,
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      return { ...state, userSrc: action.payload};
    case LOGIN:
      return {...state, currentUser: action.payload}
    case LOGOUT:
      return {...state, currentUser: null}
    // case UPDATE_LIST:
    //   const old = state.currentUser.teams_info[action.board.team_id].tasks[action.oldList].forEach(task =>{
    //     if (task.id == action.task.id){
    //       return task.pop
    //     }
    //   })
    //
    //   console.log(old, "from")
    //   debugger
    //
    //   // .filter(task => task.id != action.task.id)
    //   const list = state.currentUser.teams_info[action.board.team_id].tasks[action.newList.id].push(action.task)
    //   return {...state, ...state.currentUser: {state.currentUser, teams_info: {...state.currentUser.teams_info, }} }
    default:
      return state;
  }
}
