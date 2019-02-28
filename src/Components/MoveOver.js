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
      fetch(`http://localhost:3000/api/v1/tasks/${this.props.task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        list_id: this.props.list.id
      })
    })
    .then(res => res.json())
    .then(window.location.reload())
    )
  }

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
