import React from 'react'
import { Card } from 'react-materialize'
import { connect } from "react-redux"
const TeamBoard = ({board}) => {

  return (
    <Card className="cardOver Center z-depth-1">
      <p>{board.name}</p>
    </Card>
  )
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp)(TeamBoard)
