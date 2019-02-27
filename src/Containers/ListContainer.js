import React from 'react';
import { connect } from 'react-redux'
import TaskForm from '../FormComponents/TaskForm.js'
import Task from '../Components/Task.js'

class ListContainer extends React.Component{
  render () {
    const { currentUser, list } = this.props
    console.log(list)
    return (
      <>
        {currentUser && list.tasks.map(task => <Task key={task.id} task={task}/>)}
        {currentUser && <TaskForm id={list.id}/>}
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
