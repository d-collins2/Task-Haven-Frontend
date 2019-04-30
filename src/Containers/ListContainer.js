import React from 'react';
import { connect } from 'react-redux'
import { updateLists } from '../redux/actions.js'
import TaskForm from '../forms/TaskForm.js'
import Task from '../components/Task.js'
import { Button } from 'semantic-ui-react'
import { Col, Icon, Row } from 'react-materialize'

class ListContainer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    const { list } = this.props

    this.state = {
      dragObject: null,
      list: list,
      tasks: list.tasks,
    }
  }

  handleDelete = () => {
    const newLists = [...this.props.lists].filter(list => list !== this.props.list)
    this.props.updateLists(newLists)
    fetch(`http://localhost:3000/api/v1/lists/${ this.props.list.id }`, { method: 'DELETE' })
  }

  addTask = (task, newList) => {
    const change = this.props.lists.map(list => {
      if(list.id === newList.id){
        list.tasks.push(task)
      }
      return list
    })

    this.props.updateLists(change)
  }

  deleteTask = (task) => this.setState({
    tasks: [...this.state.tasks].filter(t => t !== task)
  })


  updateTask = (task, response) => {
    const { tasks } = this.props.list
    const index =  [...tasks].findIndex(t => t.id === task.id)
    const change = [...tasks].map((item, i) => {
      if(i === index){
        return response
      }
      return item
    })

    this.setState({ tasks: change })
  }


  handleMoveClick = (task, newList, hide) => {
    return (
      fetch(`http://localhost:3000/api/v1/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        list_id: newList.id,
        id: task.id
      })
    })
    .then(res => res.json())
    .then(response => {
      this.props.updateList(newList, task, response)
      hide()
    })
  )}

  render() {
		const { start, drop, over } = this.props
    const { list, tasks } = this.state

    return (
      <div
        onDragOver={(event) => over(event, list)}
        onDrop={(event) => drop(event, list)}
      >
        { tasks && tasks.map((task, i) => {
          return <Task
              key={i}
              start={ start }
              task={ task }
              list={ list }
              tasks = { list.tasks }
              handleMoveClick={ this.handleMoveClick }
              updateTask={ this.updateTask }
              deleteTask={ this.deleteTask }
            />
          })}
        <Row>
          <Col s={6}>
            {tasks &&
              // eslint-disable-next-line
              (tasks.length != 9 ? <TaskForm
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
    board: state.board,
    lists: state.lists
  }
}

export default connect(msp, {updateLists})(ListContainer)
