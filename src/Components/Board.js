import React from 'react'
import { Card } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const Board = ({history, board, currentUser}) => {
  const handleClick = () => {
    history.push(`/boards/${board.id}`)
  }

  return (
    <Card className="grey font lighten-1" onClick={() => handleClick()}>
      <p>{board.name}</p>
    </Card>
  )
}

function msp (state){
  return{
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp)(Board))
