import React from 'react';
import { connect } from 'react-redux'
import TaskForm from '../FormComponents/TaskForm.js'
import Task from '../Components/Task.js'
import { Button } from 'react-materialize'
class ListContainer extends React.Component{
  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/lists/${this.props.list.id}`, { method: 'DELETE' })
    // eslint-disable-next-line
    .then({...this.props.boards, list: this.props.board.lists.filter(list => list.id == this.props.list.id)})
  }

  render () {
    const { currentUser, list, board } = this.props
    return (
      <>
        {currentUser && list.tasks.map(task => <Task key={task.id} board={board} task={task}/>)}
        {currentUser && <TaskForm id={list.id}/>}
        <Button onClick={ this.handleDelete } className="red">Delete</Button>
      </>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}



export default connect(msp)(ListContainer)
