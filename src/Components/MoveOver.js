import React from 'react'
import { connect } from 'react-redux'

class MoveOver extends React.Component {
  state={
    list: null,
    key: null
  }
  handleMoveClick = () => {
    const {task, list} = this.props
    const oldList = task.list_id
    return (
      fetch(`http://localhost:3000/api/v1/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        list_id: list.id,
        id: task.id
      })
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
    })
  )}

  render(){
    const { list } = this.props
    return (
    <div key={this.state.key} onClick={()=>{this.handleMoveClick()}}>{list.name}</div>
    )
  }
}
function msp(state){
  return{
    currentUser: state.currentUser
  }
}

export default connect(msp)(MoveOver)
