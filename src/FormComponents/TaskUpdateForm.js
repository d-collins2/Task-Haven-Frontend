import React from 'react';
import { Modal, Button } from 'react-materialize'
import { connect } from "react-redux"
import { updateCurrentUserAction } from '../redux/actions.js'

class TaskUpdateForm extends React.Component{
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
    .then(window.location.reload())
    )
  }


  render(){
    return (
      <Modal
        header='Team Form'
        bottomSheet
        trigger={<Button className='blue lighten-2'>Teams</Button>}>
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

export default connect(msp, {updateCurrentUserAction})(TaskUpdateForm)
