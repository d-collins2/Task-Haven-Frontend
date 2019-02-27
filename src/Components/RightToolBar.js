import React from 'react'
import { Card, Collection, CollectionItem } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TeamForm from './TeamForm.js'

class RightToolBar extends React.Component{
  handleTeamClick = (team) => {
    this.props.history.push(`/teams/${team.id}`)
  }

  handleBoardClick = (currentUser) => {
    this.props.history.push(`/boards`)
  }

  handleHomeClick = (currentUser) => {
    this.props.history.push(`/`)
  }

  render(){
    const { currentUser } = this.props
      return (
        <Card className="Center cardOver">
          <Collection >
            <CollectionItem className="cardOver" onClick={() => {this.handleBoardClick()}}>Board</CollectionItem>
            <CollectionItem className="cardOver" onClick={() => {this.handleHomeClick()}}>Home</CollectionItem>
          </Collection>
          <span>Teams</span>
          <div>{<TeamForm />}</div>


          <Collection className="Center">
            {currentUser && currentUser.teams.map(team => {
                return <CollectionItem className="cardOver " onClick={()=>{this.handleTeamClick(team)}} key={team.id}>{team.name}</CollectionItem>
              })}
          </Collection>
        </Card>
      )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp)(RightToolBar))
