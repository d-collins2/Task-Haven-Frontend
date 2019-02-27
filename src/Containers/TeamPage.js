import React from 'react';
import { Card, Collection, CollectionItem, Row, Col, Tabs, Tab } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TeamBoardContainer from './TeamBoardContainer.js'
import { updateUserAction } from '../redux/actions.js'

class TeamPage extends React.Component{
  // componentDidMount(){
  //   fetch('http://localhost:3000/api/v1/users/')
  //   .then(res => res.json())
  //   .then(response => {
  //     this.props.updateUserAction(response)
  //   })
  // }


  render () {
    const { currentUser, location} = this.props
    const id = location.pathname.split('/')[2]
    const team = currentUser ? currentUser.teams.find(team => team.id == id) : null

    return (
      <Card className="">
        <Card>
          {team ?(
            <Row>
              <Col s={4}>
              </Col>
              <Col s={4}>
                  <h1 className="Center">{team.name}</h1>
              </Col>
          </Row>
          )
          : null}
          <Row>
            <Col s={1}></Col>
            <Col s={10}>
              <Tabs className='Center z-depth-1'>
                  <Tab title="Boards" active tabWidth={4}><TeamBoardContainer team={team}/></Tab>
                  <Tab title="Members" tabWidth={4}>
                    {currentUser ? <Collection className="z-depth-1">
                      {team.team_members.map(member => {
                        return <CollectionItem className="Center cardOver" key={member.id}>{member.id}</CollectionItem>
                      })}
                    </Collection> : null}
                  </Tab>
                  <Tab title="Settings" tabWidth={4}><div className="z-depth-1"></div></Tab>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </Card>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}


export default withRouter(connect(msp, {updateUserAction})(TeamPage))
