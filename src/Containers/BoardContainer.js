import React from 'react';
import Board from '../Components/Board.js'
import { Card, Row, Col } from 'react-materialize'
import { connect } from 'react-redux'


class BoardContainer extends React.Component{
  render () {

    return (

      <Card className="Center cardOver">
        <Row>
          {this.props.currentUser && this.props.currentUser.teams.map(team => {
            return team.boards.map(board => {
              return (
                <Col s={3} m={3} key={board.id}>
                  <Board key={board.id} board={board}/>
                </Col>)
            })
          })}
        </Row>
      </Card>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

function mdp(dispatch){
  return {
    // addBoard: dispatch(addBoard())
  }
}

export default connect(msp, mdp)(BoardContainer)
