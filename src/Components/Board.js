import React from 'react'
import { Card, Button, Icon } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCurrentUserAction } from '../redux/actions.js'


const Board = ({history, board, currentUser, updateCurrentUserAction}) => {
  const handleClick = () => {
    history.push(`/boards/${board.id}`)
  }

  function handleDelete(){
    fetch(`http://localhost:3000/api/v1/boards/${board.id}`, { method: 'DELETE' })
    .then(fetch('http://localhost:3000/api/v1/current_user/', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(response => {
      updateCurrentUserAction(response)
    })
  )}

  return (
    <>
      <Card className="grey lighten-3" onClick={() => handleClick()}>
        <p>{board.name}</p>
      </Card>
      <Button onClick={()=>handleDelete() } className="red"><Icon>delete</Icon></Button>
    </>
  )
}

function msp (state){
  return{
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction})(Board))
