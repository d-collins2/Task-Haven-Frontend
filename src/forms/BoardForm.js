import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize'
import { connect } from "react-redux"
import { Button } from 'semantic-ui-react'
import { updateCurrentUserAction } from '../redux/actions.js'

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
         team_id: this.props.id,
         topic: `New Board Alert by ${this.props.currentUser.full_name}`,
         user_id: this.props.currentUser.id
      })
    })
    .then(window.location.reload())
  )}


  render(){
    return (
      <Collapsible popout>
        <CollapsibleItem header='New Board' className="Center opacity" icon='add'>
          <form onSubmit={this.handleBoard}>
            <label>Name</label>
            <input onChange={this.handleChange} name="name" placeholder='name' />
            <Button className="blue lighten-2">Submit</Button>
          </form>
        </CollapsibleItem>
      </Collapsible>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp, {updateCurrentUserAction})(Board)
