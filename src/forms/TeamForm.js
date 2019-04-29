import React from 'react';
import { connect } from "react-redux"
import { updateCurrentUserAction } from '../redux/actions.js'
import { Button } from 'semantic-ui-react'
import { Input, Row } from 'react-materialize'

class TeamForm extends React.PureComponent{
  state = {
    name: '',
    teamMembers: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckBoxChange = (event) => {
    console.log(event.target.value)
    this.setState({
      teamMembers: [...this.state.teamMembers, event.target.value]
    })
  }

  handleTeam = (event) => {
    event.preventDefault()
    return (
      fetch('http://localhost:3000/api/v1/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        user_id: this.props.currentUser.id,
        team_members: this.state.teamMembers,
      })
    })
    .then(res => res.json())
    .then(team => {
      this.setState({ teamMembers: [] })
      this.props.addTeam(team)
    })
  )}
//
  render(){
    const { currentUser, possibleMembers } = this.props
    const filtered = () => {
      if (currentUser) {
        return [...possibleMembers].filter(member => member.id !== currentUser.id)
      }
    }
    return (
      <form onSubmit= {this.handleTeam }>
          <label>Name</label>
          <input onChange={ this.handleChange } name="name" placeholder='name'/>
            { possibleMembers && filtered().map(member => {
              return (
                <Row key={ member.id }>
                  <Input
                    onChange={ this.handleCheckBoxChange }
                    name={ member.full_name }
                    type='checkbox'
                    label={ member.full_name }
                    className='filled-in'/>
                </Row>
              )
            }
          )}
        <Button className="blue lighten-2">Submit</Button>
      </form>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp, {updateCurrentUserAction})(TeamForm)
