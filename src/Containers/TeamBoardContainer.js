import React from 'react';
import { Row, Col } from 'react-materialize'
import { connect } from 'react-redux'
import Board from '../components/Board.js'
import BoardForm from '../forms/BoardForm'
import {withRouter} from 'react-router-dom'

class TeamBoardContainer extends React.Component{
  render () {
    const {team, currentUser} = this.props
    return (
      <>
      <Row>
        <Col s={4}></Col>
        <Col s={4}>
          {team && <BoardForm id={team.id}/>}
        </Col>
      </Row>
        <Row >
          {currentUser && currentUser.teams_info[team.id].boards.map(board => {
              return (
                <Col s={3} m={3} key={board.id}>
                  <Board key={board.id} board={board}/>
                </Col>)
            })
          }
        </Row>
      </>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp)(TeamBoardContainer))
