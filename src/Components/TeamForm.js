import React from 'react';
import { Modal, Card } from 'react-materialize'
import { connect } from "react-redux"
import Button from '@material-ui/core/Button'
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
      fetch('http://localhost:3000/api/v1/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
         name: this.state.name,
         user_id: this.props.currentUser.id
      })
    })
    .then(res => res.json())
    .then(response => {

    })
    )
  }

  teamForm(){
  return(
    <>

    </>
  )
}

  render(){
    return (
      <Modal
        header='Modal Header'
        bottomSheet
        trigger={<Card className="cardOver">New Team</Card>}>
          <form onSubmit={this.handleTeam}>
            <label>Name</label>
            <input onChange={this.handleChange} name="name" placeholder='name' />
            <Button variant="contained" color="primary">Submit</Button>
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
