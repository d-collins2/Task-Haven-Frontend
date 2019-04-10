import React from 'react'
import { updateCurrentUserAction } from '../redux/actions.js'
import { connect } from 'react-redux'

class MoveOver extends React.Component {
  state={
    list: null,
    key: null
  }
  handleMoveClick = () => {
    return (
      fetch(`http://localhost:3000/api/v1/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        topic: `Task Updated by ${this.props.currentUser.full_name}`,
        list_id: this.props.list.id,
        board_id: this.props.list.board_id,
        task_id: this.props.task.id
      })
    })
    .then(res => res.json())
    .then(fetch('http://localhost:3000/api/v1/current_user/', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(response => {
      this.props.updateCurrentUserAction(response)
    })
    )
  )}

  render(){
    const { list } = this.props
    return (
    <div modal='close' key={this.state.key} onClick={()=>{this.handleMoveClick()}}>{list.name}</div>
    )
  }
}
function msp(state){
  return{
    currentUser: state.currentUser
  }
}

export default connect(msp, {updateCurrentUserAction})(MoveOver)
