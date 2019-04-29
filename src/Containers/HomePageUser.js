import React from 'react';
import BoardContainer from './BoardContainer.js'
import RightToolBar from '../components/RightToolBar.js'
import { Col, Row } from 'react-materialize'

const HomePageUser = () => {
  return (
    <Row>
      <Col s={3}>
        <RightToolBar />
      </Col>
      <Col s={9}>
        <BoardContainer />
      </Col>
    </Row>
  )
}

export default HomePageUser
