import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Modal, Button, Row, Col, Collection, CollectionItem, Input } from 'react-materialize'
import MoveOver from './MoveOver.js'

class Task  extends React.Component{
  state = {
    name: '',
    due_date: '',
    description: ''
  }
  handleSubmit = () => {
    fetch(`http://localhost:3000/api/v1/tasks/${this.props.task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: this.state.name,
      due_date: this.state.date,
      description: this.state.description
    })
  })
  .then(res => res.json())
  .then(window.location.reload())
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/tasks/${this.props.task.id}`, { method: 'DELETE' })
    .then(window.location.reload())
  }

  render(){
    const { handleChange, handleSubmit, handleDelete } = this
    const { task, board } = this.props
    // eslint-disable-next-line
    const filtered = () => board ? board.lists.filter(list => list.id != task.list_id) : null
    return (
      <Modal
        className='Center modal-close'
        trigger={ <Card className="grey lighten-4"><p>{ task.name }</p></Card> }
      >
          <Row>
            <Col s={2} m={8}>
              <Row >
                <Input onChange={ handleChange } s={6} label='Name of Team' name="name" placeholder={task.name} />
                <Input s={6} label='Due Date' name='due_date' type='date' onChange={ handleChange} placeholder={task.due_date}/>
                <Input onChange={ handleChange } s ={12} label='description' type="textarea" name="description" placeholder={task.description}  />
                  <Row>
                    <Col s={3}></Col>
                    <Col s={3} m={8}>
                      <Input name='group1' type='checkbox' value='red' label='Red' className='filled-in' />
                      <Input name='group1' type='checkbox' value='yellow' label='Yellow' className='filled-in'/>
                      <Input name='group1' type='checkbox' value='green' label='Green' className='filled-in'  />
                      <Input name='group1' type='checkbox' value='blue' label='Blue' className='filled-in' />
                    </Col>
                  </Row>
                <Button onClick={ handleSubmit } className="blue lighten-2">Submit</Button>
              </Row>
            </Col>
            <Col s={3} m={3}>
              <Card className="z-depth-1" >
                <Collection defaultValue="1">
                  {filtered() && filtered().map(list => {
                    return  <CollectionItem key={ task.id }><MoveOver task={ task } id={ list.id } list={ list }/></CollectionItem>
                  })}
                </Collection>
                <Button onClick={ handleDelete } className="red">Delete</Button>
              </Card>
            </Col>
          </Row>
      </Modal>
    )
  }
}

export default withRouter(Task)
