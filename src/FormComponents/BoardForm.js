import React from 'react';
import { Button, Modal, Card } from 'react-materialize'
import { connect } from "react-redux"

class Team extends React.Component{
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

  handleTeam = (event) => {
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
    .then(response => {

    })
    )
  }


  render(){
    console.log(this.state, this.props);
    return (
      <Modal
        header='Board Form'
        bottomSheet
        trigger={<Card className="cardOver">New Board</Card>}>
          <form onSubmit={this.handleTeam}>
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

export default connect(msp)(Team)
