import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'react-materialize'
import Board from '../components/Board.js'


const BoardContainer = ({currentUser}) => {
  return (
    <Row>
      {currentUser && currentUser.boards.map(board => {
          return (
            <Col s={3} m={3} key={board.id}>
              <Board key={board.id} board={board}/>
            </Col>
          )
        })
      }
    </Row>
  )
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp)(BoardContainer)
