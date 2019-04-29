import React from 'react';
import { connect } from 'react-redux'
import TaskForm from '../forms/TaskForm.js'
import Task from '../components/Task.js'
import { Button } from 'semantic-ui-react'
import { Col, Icon, Row } from 'react-materialize'

class ListContainer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    const { list, tasks } = this.props

    this.state = {
      dragObject: null,
      list: list,
      tasks: tasks,
    }
  }

  handleDelete = () => {
    this.props.deleteList(this.props.list)
    fetch(`http://localhost:3000/api/v1/lists/${ this.props.list.id }`, { method: 'DELETE' })
  }

  updateTask = (task, response) => {
    const { tasks } = this.props.list
    const index =  [...tasks].findIndex(t => t.id === task.id)
    const change = [...tasks].map((item, i) => {
      if(i == index){
        return response
      }
      return item
    })

    this.setState({ tasks: change })
  }

  deleteTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks].filter(t => t !== task)
    })
  }

  render() {
		const { start, drop, over, board, lists, handleMoveClick } = this.props
    const { list, tasks, show } = this.state

    return (
      <div
        onDragOver={ (event) => over(event, list) }
        onDrop={ (event) => drop(event, list, this.hideModal) }
      >
        { tasks && tasks.map((task, i) => {
          return <Task
              key={i}
              start={ start }
              board={ board }
              task={ task }
              list={ list }
              lists={ lists }
              show={ show }
              showModal= { this.showModal }
              hideModal= { this.hideModal }
              tasks = { list.tasks }
              handleMoveClick={ handleMoveClick }
              updateTask={ this.updateTask }
              deleteTask={ this.deleteTask }
            />
          })}
        <Row>
          <Col s={6}>
            {tasks &&
              // eslint-disable-next-line
              (tasks.length != 9 ? <TaskForm
                board={board}
                list={list}
                addTask={this.props.addTask}/> : null
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
    currentUser: state.currentUser
  }
}



export default connect(msp)(ListContainer)
