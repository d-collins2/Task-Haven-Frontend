import React from 'react';
import { connect } from 'react-redux'
import TaskForm from '../forms/TaskForm.js'
import Task from '../components/Task.js'
import { Icon, Row, Col } from 'react-materialize'
import { Button } from 'semantic-ui-react'

class ListContainer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dragObject: null,
      board: this.props.board,
      list: this.props.list,
      tasks: this.props.list.tasks
    }
  }

  handleDelete = () => {
    this.props.deleteList(this.props.list)
    fetch(`http://localhost:3000/api/v1/lists/${this.props.list.id}`, { method: 'DELETE' })
  }

  addTask = (task) => {
    this.setState({tasks: [...this.state.tasks].concat(task)})
  }

  updateTask = (task, response) => {
    const index =  this.state.tasks.findIndex(t => t.id === task.id)
    const change = [...this.state.tasks].map((item, i) => {
      if(i !== index){
        return item
      }
      return {...item, ...response}
    })
    console.log(task, index)
    this.setState({tasks: change})
  }

  deleteTask = (task) => {
    this.setState({tasks: [...this.state.tasks].filter(t => t !== task)})
  }

  render() {
		const {currentUser, start, drop, over } = this.props
    const { list, tasks, board } = this.state
    return (
      <div onDragOver={(e) => over(e, list)} onDrop={(e) => drop(e, list)}>
        {board && tasks.map(task => <Task
          key={task.id}
          start={start}
          board={board}
          task={task}
          list={this.state.list}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}/>)}
        <Row>
          <Col s={6}>
            {currentUser &&
              // eslint-disable-next-line
              (tasks.length != 9 ? <TaskForm
                board={board} list={list}
                addTask={this.addTask}/> : null)}
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
