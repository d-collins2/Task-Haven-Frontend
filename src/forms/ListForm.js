import React from 'react';
import { connect } from "react-redux"
import { updateLists } from '../redux/actions.js'
import { Button } from 'semantic-ui-react'
import { Collapsible, CollapsibleItem } from 'react-materialize'


class ListForm extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  addList = (src) => {
    const newLists = [...this.props.lists].concat(src)
    this.props.updateLists(newLists)
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
        topic: `New List Alert by ${ this.props.currentUser.full_name }`,
        user_id: this.props.currentUser.id
      })
    })
    .then(res => res.json())
    .then(response => {
      this.addList(response)
    }))
  }

  render(){
    return (
      <Collapsible popout>
        <CollapsibleItem header='New List' className="Center" icon='add'>
          <form  onSubmit={ this.handleList }>
            <label>Name</label>
            <input onChange={ this.handleChange } name="name" placeholder='name'/>
            <Button className="blue lighten-2">Submit</Button>
          </form>
        </CollapsibleItem>
      </Collapsible>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser,
    board: state.board,
    lists: state.lists
  }
}

export default connect(msp, {updateLists})(ListForm)
