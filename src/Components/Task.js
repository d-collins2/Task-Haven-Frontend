import React from 'react'
import { connect } from 'react-redux'
import Modal from '../style/Modal.js'
import {
  Button,
  Card,
  Col,
  Collection,
  CollectionItem,
  Icon,
  Input,
  Row } from 'react-materialize'

class Task  extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    const { task } = this.props
    this.state= {
      name: task.name,
      due_date: task.due_date,
      description: task.description,
      labels: task.labels,
      show: false
    }
  }

  showModal = () => this.setState({ show: true });
  hideModal = () => this.setState({ show: false });

  handleSubmit = () => {
    const { task, currentUser, board } = this.props;
    const { name, due_date, description, labels } = this.state;
    const temp = task

    fetch(`http://localhost:3000/api/v1/tasks/${ task.id }`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: name,
      due_date: due_date,
      description: description,
      topic: `Task Updated by ${ currentUser.full_name }`,
      user_id: currentUser.id,
      board_id: board.id,
      labels: labels
    })
  })
  .then(res => res.json())
  .then(task => {
    this.props.updateTask(temp, task)
    this.hideModal()
  })}

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete = () => {
    const { task } = this.props
    this.props.deleteTask(task)
    fetch(`http://localhost:3000/api/v1/tasks/${ task.id }`, { method: 'DELETE' })
    .then(this.hideModal())
  }

  labels = () => {
    switch(this.props.task.labels) {
      case "blue":
        return <i className = "material-icons blue600 left">fiber_manual_record</i>
      case "red":
        return <i className = "material-icons red600 left">fiber_manual_record</i>
      case "yellow":
        return <i className = "material-icons yellow600 left">fiber_manual_record</i>
      case "green":
        return <i className = "material-icons green600 left">fiber_manual_record</i>
      case "orange":
        return <i className = "material-icons orange600 left">fiber_manual_record</i>
      default:
        return null
    }
  }

  taskInfo = () => {
    const { task, start } = this.props

    return (
      <div
        className="grey lighten-4"
        draggable
        onClick = { this.showModal }
        onDragStart = { (event) => start(event, task) }>
        <Card>
          { task.name }
          { task.labels ? this.labels() : null }
        </Card>
      </div>
    )
  }

  handleCheckBoxChange = (event) => {
    this.setState({
      labels: event.target.value
    })
  }

  render(){
    const { lists, task, handleMoveClick } = this.props
      // eslint-disable-next-line
    const filtered = () => lists && [...lists].filter(list => list.id != task.list_id)
    return (
      <>
        { this.taskInfo() }
        <Modal
          className='Center'
          show={ this.state.show }
          handleClose={ this.hideModal }>
          <div>
            <Row>
              <Col s={2} m={8}>
                <Row>
                  <Input
                    onChange={ this.handleChange }
                    s={6}
                    label='Name of Team'
                    name='name'
                    placeholder={ task.name }/>
                  <Input
                    onChange={ this.handleChange }
                    s={6}
                    label='Due Date'
                    name='due_date'
                    type='date'
                    placeholder={ task.due_date }/>
                  <Input
                    onChange={ this.handleChange }
                    s={12}
                    label='description'
                    type='textarea'
                    name='description'
                    placeholder={ task.description }/>
                  <label className='Center'>Labels</label>
                    <Row>
                      <Col s={3}></Col>
                      <Col s={3} m={8}>
                        <Input
                          onChange={ this.handleCheckBoxChange }
                          type='checkbox'
                          value='red'
                          label={
                            <i className="material-icons red600 left">
                              fiber_manual_record
                            </i>
                          }
                          className='filled-in'/>
                        <Input
                          onChange={ this.handleCheckBoxChange }
                          type='checkbox'
                          value='blue'
                          label={
                            <i className="material-icons blue600 left">
                              fiber_manual_record
                            </i>
                          }
                          className='filled-in'/>
                        <Input
                          onChange={ this.handleCheckBoxChange }
                          type='checkbox'
                          value='yellow'
                          label={
                            <i className="material-icons yellow600 left">
                              fiber_manual_record
                            </i>
                          }
                          className='filled-in'/>
                        <Input
                          onChange={ this.handleCheckBoxChange }
                          className='filled-in'
                          type='checkbox'
                          label={
                            <i className="material-icons green600 left">
                              fiber_manual_record
                            </i>
                          }
                          value='green'/>
                        <Input
                          onChange={ this.handleCheckBoxChange }
                          type='checkbox'
                          value='orange'
                          label={
                            <i className="material-icons orange600 left">
                              fiber_manual_record
                            </i>
                          }
                          className='filled-in'/>
                      </Col>
                    </Row>
                  <Button
                    onClick={ this.handleSubmit }
                    className="blue lighten-2">
                    Submit
                  </Button>
                </Row>
              </Col>
                <Col s={3} m={3}>
                  <Card className="z-depth-1" >
                    <Collection defaultValue="1">
                      {filtered() && filtered().map(list => {
                        return  (
                          <CollectionItem
                            key={ list.id }>
                            <div onClick={ ()=> { handleMoveClick(task, list, this.hideModal)}}>
                              { list.name }
                            </div>
                          </CollectionItem>
                        )
                      })}
                    </Collection>
                    <Button
                      onClick={ this.handleDelete }
                      className="red">
                      <Icon large>delete</Icon><br/>
                    </Button>
                  </Card>
                </Col>
              </Row>
            </div>
          </Modal>
        </>
    )
  }
}

function msp (state){
  return {
    currentUser: state.currentUser,
    board: state.board,
    lists: state.lists
  }
}

export default connect(msp)(Task)
