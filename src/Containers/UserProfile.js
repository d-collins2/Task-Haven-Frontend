import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BoardContainer from '../containers/BoardContainer.js'
import UserSettings from '../components/UserSettings.js'
import {
  Card,
  Col,
  Collection,
  CollectionItem,
  Row,
  Tabs,
  Tab } from 'react-materialize'

const UserProfile = ({ currentUser }) => {

  const profileInfo = () => {
    if(currentUser){
      return (
        <Row>
          <Col>
            <img src="teamwork.png" alt="random"/>
          </Col>
          <Col s={6}>
            <h3>{ currentUser.full_name }</h3>
            <p>Email: { currentUser.email }</p>
          </Col>
        </Row>
      )
    }
  }

  return (
    <Card>
      <div>
          <Row>
            <Col s={3}></Col>
            <Col s={9}>{ profileInfo() }</Col>
          </Row>
          <Row>
          <Col s={1}></Col>
          <Col s={10}>
            <Tabs className='Center z-depth-1'>
              <Tab active title="Boards" tabWidth={4}>
              <Row>
                <Col s={1}></Col>
                <Col s={10}><BoardContainer /></Col>
              </Row>
              </Tab>
              <Tab title="Teams" tabWidth={4}>
                <Row>
                  <Col s={3}></Col>
                  <Col s={6}>
                  <Collection className="Center z-depth-1">
                    { currentUser && currentUser.teams.map(team => {
                      return (
                        <CollectionItem
                          className="font"
                          key={ team.id }
                          href={`/teams/${ team.id }`}>
                          { team.name }
                        </CollectionItem>
                      )
                    })}
                    </Collection>
                  </Col>
                </Row>
              </Tab>
              <Tab
                title="Settings"
                tabWidth={4}>
                <UserSettings />
              </Tab>
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


export default withRouter(connect(msp)(UserProfile))
