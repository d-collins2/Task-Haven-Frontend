import React from 'react';
import { connect } from 'react-redux'
import TaskForm from '../forms/TaskForm.js'
import Task from '../components/Task.js'
import { Button } from 'semantic-ui-react'
import { Col, Icon, Row } from 'react-materialize'

class ListContainer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    const { board, list } = this.props

    this.state = {
      dragObject: null,
      board: board,
      list: list,
      tasks: list.tasks
    }
  }

  handleDelete = () => {
    const { list } = this.props
    this.props.deleteList(list)
    fetch(`http://localhost:3000/api/v1/lists/${ list.id }`, { method: 'DELETE' })
  }

  addTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks].concat(task)
    })
  }

  updateTask = (task, response) => {
    const { tasks } = this.state
    const index =  tasks.findIndex(t => t.id === task.id)
    const change = [...tasks].map((item, i) => {
      if(i !== index){
        return item
      }
      return {...item, ...response}
    })

    this.setState({tasks: change})
  }

  deleteTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks].filter(t => t !== task)
    })
  }

  render() {
		const {currentUser, start, drop, over } = this.props
    const { list, tasks, board } = this.state
    return (
      <div
        onDragOver={ (event) => over(event, list) }
        onDrop={ (event) => drop(event, list) }
      >
        {board && tasks.map(task => <Task
          key={task.id}
          start={start}
          board={board}
          task={task}
          list={list}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}/>)}
        <Row>
          <Col s={6}>
            {currentUser &&
              // eslint-disable-next-line
              (tasks.length != 9 ? <TaskForm
                board={board}
                list={list}
                addTask={this.addTask}/> : null
              )
            }
          </Col>
          <Col s={6}>
            <Button
              onClick={ this.handleDelete }
              className="red">
              <Icon>delete</Icon>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

function msp(state){

  return {
    currentUser: state.currentUser,
    lists: state.lists
  }
}



export default connect(msp)(ListContainer)
