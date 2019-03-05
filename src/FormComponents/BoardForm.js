import React from 'react';
import { Modal, Card } from 'react-materialize'
import { connect } from "react-redux"
import { Button } from 'semantic-ui-react'

class Board extends React.Component{
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

  handleBoard = (event) => {
    event.preventDefault()
    return (
      fetch('http://localhost:3000/api/v1/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
         name: this.state.name,
         team_id: this.props.id
      })
    })
    .then(res => res.json())
    .then(
       window.location.reload()
    )
    )
  }


  render(){
    return (
      <Modal
        header='Board Form'
        bottomSheet
        trigger={<Card className="opacity font grey lighten-1">New Board</Card>}>
          <form onSubmit={this.handleBoard}>
            <label>Name</label>
            <input onChange={this.handleChange} name="name" placeholder='name' />
            <Button className="blue lighten-2">Submit</Button>
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

export default connect(msp)(Board)
