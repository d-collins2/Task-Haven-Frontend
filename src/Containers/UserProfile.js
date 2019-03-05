import React from 'react';
import { Card, Row, Col, Tabs, Tab, Collection, CollectionItem } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUserAction } from '../redux/actions.js'
import BoardContainer from '../Containers/BoardContainer.js'
import UserSettings from '../Components/UserSettings.js'

class UserProfile extends React.Component{

  profileInfo = () => {
    const { currentUser } = this.props
    return (
      <>
      <Row className="">
        <Col>
          {currentUser.img_url ? <img src={currentUser.img_url} alt="random"/> : <img src="https://i.stack.imgur.com/Bzcs0.png" alt="random"/>}
        </Col>
        <Col s={6}>
          <h3 className="">{currentUser.full_name}</h3>
          <p className="">Email: {currentUser.email}</p>
        </Col>
      </Row>
      </>
    )
  }

  render () {
    const { currentUser } = this.props
    console.log(currentUser);
    return (
      <Card className="">
        <div>
            <Row>
              <Col s={3}>
              </Col>
              <Col s={9}>
                  {currentUser && this.profileInfo()}
              </Col>
            </Row>
            <Row>
            <Col s={1}></Col>
            <Col s={10}>
              <Tabs className='Center z-depth-1'><Tab title="Boards" active tabWidth={4}>
                <Row>
                  <Col s={1}></Col>
                  <Col s={10} >
                    <BoardContainer />
                  </Col>
                </Row>
              </Tab>
              <Tab title="Teams" tabWidth={4}>
                {currentUser &&
                <Row>
                  <Col s={3}></Col>
                  <Col s={6} >
                  <Collection className="Center z-depth-1">
                    {currentUser && currentUser.teams.map(team => {
                      return (
                        <CollectionItem className="font" key={team.id} href={`/teams/${team.id}`}>{team.name}</CollectionItem>
                      )
                    })}
                    </Collection>
                  </Col>
                </Row>}
              </Tab>
              <Tab
                title="Settings"
                tabWidth={4}>
                <div className="z-depth-1"></div>
                <UserSettings />
              </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}


export default withRouter(connect(msp, {updateUserAction})(UserProfile))
