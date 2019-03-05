import React from 'react';
import { connect } from 'react-redux'
import TaskForm from '../FormComponents/TaskForm.js'
import Task from '../Components/Task.js'
import { Icon, Row, Col } from 'react-materialize'
import { Button } from 'semantic-ui-react'

class ListContainer extends React.Component<ListProps>{
  state = {
    dragObject: null
  }
  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/lists/${this.props.list.id}`, { method: 'DELETE' })
    // eslint-disable-next-line
    .then(window.location.reload())
  }

  render() {
		const {currentUser, list, board } = this.props


    return (
      <div>
        {currentUser && list.tasks.map(task => <Task key={task.id} board={board} task={task}/>)}
        <Row>
          <Col s={6}>
            {currentUser && <TaskForm id={list.id}/>}
          </Col>
          <Col s={6}>
            <Button onClick={ this.handleDelete } className="red"><Icon>delete</Icon></Button>
          </Col>
        </Row>
      </div>
    )
  }
}

function msp(state){

  return {
    currentUser: state.currentUser
  }
}



export default (connect(msp)(ListContainer))
