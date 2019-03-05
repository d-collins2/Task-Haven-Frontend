import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Collection, CollectionItem, Collapsible, CollapsibleItem } from 'react-materialize'
import TeamForm from '../FormComponents/TeamForm.js'

class RightToolBar extends React.Component{

  handleBoardClick = (currentUser) => {
    this.props.history.push(`/`)
  }

  handleHomeClick = (currentUser) => {
    this.props.history.push(`/home`)
  }

  render(){
    const { currentUser } = this.props
      return (
        <Card className="Center grey lighten-3 ">
            <Collapsible popout>
              <CollapsibleItem header='Teams' icon='people'>
                <Collection className="Center z-depth-1">
                  {currentUser && currentUser.teams.map(team => {
                    return (
                      <CollectionItem className="font" key={team.id} href={`/teams/${team.id}`}>{team.name}</CollectionItem>
                    )
                  })}
                </Collection>
              </CollapsibleItem>
              <CollapsibleItem header='Create A Team' icon='group_add'>
                <TeamForm />
              </CollapsibleItem>
            </Collapsible>
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
