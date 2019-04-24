import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize'
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
        board_id: this.props.board.id,
        topic: `New List Alert by ${this.props.currentUser.full_name}`,
        user_id: this.props.currentUser.id
      })
    })
    .then(res => res.json())
    .then(response => {
      this.props.addList(response)
    }))
  }

  render(){
    return (
      <Collapsible popout>
        <CollapsibleItem header='New List' className="Center" icon='add'>
          <form  onSubmit={this.handleList}>
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

export default connect(msp)(List)
