import React from 'react';
import { connect } from 'react-redux'
import Board from '../components/Board.js'
import BoardForm from '../forms/BoardForm'
import { Row, Col } from 'react-materialize'

const TeamBoardContainer = ({ currentUser, team }) => {
  console.log(team)
  return (
    <>
      <Row>
        <Col s={4}></Col>
        <Col s={4}>
          { team && <BoardForm id={ team.id }/> }
        </Col>
      </Row>
      <Row >
        { currentUser && [...currentUser.teams_info[team.id].boards].map(board => {
            return (
              <Col s={3} m={3} key={ board.id }>
                <Board key={ board.id } board={ board }/>
              </Col>
            )
          })
        }
      </Row>
    </>
  )
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp)(TeamBoardContainer)
