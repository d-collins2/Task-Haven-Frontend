import React from 'react';
import { Row, Input, Col, Icon } from 'react-materialize'
import { connect } from "react-redux"
import { Button } from 'semantic-ui-react'
import Modal from '../style/Modal.js'

class TaskForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      due_date: '',
      labels: "",
      show: false,
      list: this.props.list
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckBoxChange = (event) => {
    console.log(event.target.value)
    this.setState({
      labels: event.target.value
    })
  }

  handleTask = (event) => {

    event.preventDefault()
    return (
      fetch('http://localhost:3000/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
          due_date: this.state.due_date,
          list_id: this.props.list.id,
          labels: this.state.labels,
          board_id: this.props.board.id,
          user_id: this.props.currentUser.id,
          topic: `New Task Alert by ${this.props.currentUser.full_name}`
        })
      })
      .then(res => res.json())
      .then(response => {
        this.props.addTask(response)
        this.hideModal()
      }))
  }

  render(){
    const { handleChange, handleTask, handleCheckBoxChange } = this
    return (
      <>
        <Button className="opacity font grey ligthen-3" onClick={this.showModal}><Icon >add</Icon></Button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <Row >
            <Input onChange={ handleChange } s={6} label='Name of Task' name="name"  />
                 <Input s={6} label='Due Date' name='due_date' type='date' onChange={ handleChange } />
                 <Input onChange={ handleChange } s ={12} label='description' name="description"  />
                 <Row>
                     <Col s={3}></Col>
                     <Col s={3} m={8}>
                       <Input onChange={ handleCheckBoxChange } name='group1' type='checkbox' value='red' label='Red' className='filled-in' />
                       <Input onChange={ handleCheckBoxChange } name='group1' type='checkbox' value='yellow' label='Yellow' className='filled-in'/>
                     <Input onChange={ handleCheckBoxChange } name='group1' type='checkbox' value='green' label='Green' className='filled-in'  />
                       <Input onChange={ handleCheckBoxChange } name='group1' type='checkbox' value='blue' label='Blue' className='filled-in' />
                     </Col>
                   </Row>
                 <Button onClick={ handleTask } className="blue lighten-2">Submit</Button>
               </Row>
        </Modal>
      </>
    )
  }
}

function msp(state){

  return {
    currentUser: state.currentUser
  }
}

export default connect(msp)(TaskForm)
