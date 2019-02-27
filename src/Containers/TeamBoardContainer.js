import React from 'react';
import TeamBoard from '../Components/TeamBoard.js'
import { Row, Col } from 'react-materialize'
import { connect } from 'react-redux'
import { addBoard } from '../redux/actions.js'
import BoardForm from '../Components/BoardForm'

class TeamBoardContainer extends React.Component{

  handleAddBoard = () => {
    return (
      console.log('hi')
    )
  }

  render () {
    const {team, currentUser} = this.props
    return (
        <Row >
          {currentUser && team.boards.map(board => {
              return (
                <Col s={3} m={3} key={board.id}>
                  <TeamBoard key={board.id} board={board}/>
                </Col>)
            })
          }
          <Col>
              {team ? <BoardForm id={team.id}/> : null}
          </Col>
        </Row>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp, {addBoard})(TeamBoardContainer)
