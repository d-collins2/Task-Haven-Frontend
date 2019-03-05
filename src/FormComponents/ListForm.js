import React from 'react';
import {  Modal, Card } from 'react-materialize'
import { connect } from "react-redux"
import { Button } from 'semantic-ui-react'
class List extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  forceUpdate = () => {
    this.forceUpdate()
  }

  handleList = (event) => {
    event.preventDefault()
    return (
      fetch('http://localhost:3000/api/v1/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
         name: this.state.name,
         board_id: this.props.id
      })
    })
    .then(res => res.json())
    .then(window.location.reload())
    )
  }

  render(){
    return (
      <Modal
        header='List Form'
        bottomSheet
        trigger={<Card className="opacity grey ligthen-3">New List</Card>}>
          <form  onSubmit={this.handleList} modal='close'>
            <label>Name</label>
            <input onChange={this.handleChange} name="name" placeholder='name' />
            <Button modal='close' className="blue lighten-2">Submit</Button>
          </form>
      </Modal>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp)(List)
