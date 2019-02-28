import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'react-materialize'
import Board from '../Components/Board.js'


class BoardContainer extends React.Component{
  render () {
    const { currentUser } = this.props
    return (
      <>
        <Row>
          {currentUser ? currentUser.teams.map(team => {
            return team.boards.map(board => {
              return (
                <Col s={3} m={3} key={board.id}>
                  <Board key={board.id} board={board}/>
                </Col>
              )
            })
          }): null}
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

export default connect(msp)(BoardContainer)
