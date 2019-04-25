import React from 'react';
import { Row, Col } from 'react-materialize'
import BoardContainer from './BoardContainer.js'
import RightToolBar from '../components/RightToolBar.js'

class HomePageUser extends React.Component {
  render(){
    return (
    <>
      <Row>
        <Col  s={3} >
          <RightToolBar/>
        </Col>
        <Col s={9} >
          <BoardContainer />
        </Col>
      </Row>
    </>
    )
  }
}

export default HomePageUser
