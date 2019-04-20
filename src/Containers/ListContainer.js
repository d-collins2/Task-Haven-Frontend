import React from 'react';
import { connect } from 'react-redux'
import TaskForm from '../forms/TaskForm.js'
import Task from '../components/Task.js'
import { Icon, Row, Col } from 'react-materialize'
import { Button } from 'semantic-ui-react'
import { updateCurrentUserAction } from '../redux/actions.js'

class ListContainer extends React.Component {
  state = {
    dragObject: null
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/lists/${this.props.list.id}`, { method: 'DELETE' })
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
  }



  render() {
		const {currentUser, list, board, start, drop, over } = this.props

    return (
      <div onDragOver={(e) => over(e, list)} onDrop={(e) => drop(e, list)}>
        {board && list.tasks.map(task => <Task key={task.id} start={start} board={board} task={task}/>)}
        <Row>
          <Col s={6}>
            {currentUser &&
              // eslint-disable-next-line
              (list.tasks.length != 9 ? <TaskForm board={board} list={list}/> : null)}
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



export default (connect(msp, {updateCurrentUserAction})(ListContainer))
