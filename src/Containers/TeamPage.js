import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TeamBoardContainer from './TeamBoardContainer.js'
import TeamSettings from '../components/TeamSettings.js'
import {
  Card,
  Col,
  Collection,
  CollectionItem,
  Row,
  Tabs,
  Tab } from 'react-materialize'

const TeamPage = ({ currentUser, match }) => {
  // eslint-disable-next-line
  const id = match.params.id
  let team;

  const profile = () => {
    if(currentUser){
      // eslint-disable-next-line
      team = [...currentUser.teams].find(team => team.id == id)
      return (
        <Row>
          <Col>
            { team.img_url ? (
              <img src={ team.img_url } alt="random"/>) : (
                <img src="https://i.stack.imgur.com/Bzcs0.png" alt="random"/>
              )
            }
          </Col>
          <Col><h1>{ team.name }</h1></Col>
        </Row>
      )
    }
  }

  return (
    <Card>
      <div>
        <Row>
          <Col s={3}></Col>
          <Col s={9}>{ profile() }</Col>
        </Row>
        <Row>
          <Col s={1}></Col>
          <Col s={10}>
            <Tabs className='Center z-depth-1'>
              <Tab title='Boards' active tabWidth={4}>
                <Row>
                  <Col s={1}></Col>
                  <Col s={10}><TeamBoardContainer team={ team }/></Col>
                </Row>
              </Tab>
              <Tab title='Members' tabWidth={4}>
                { currentUser &&
                <Row>
                  <Col s={3}></Col>
                  <Col s={6} >
                    <Collection className='z-depth-1'>
                      { [...currentUser.teams_info[id].team_members].map(member => {
                        return (
                          <CollectionItem
                            className='center'
                            key={ member.id }>
                            { member.first_name }
                          </CollectionItem>
                        )
                      })}
                    </Collection>
                  </Col>
                </Row>}
              </Tab>
              <Tab title='Settings' tabWidth={4}><TeamSettings/></Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}


export default withRouter(connect(msp)(TeamPage))
