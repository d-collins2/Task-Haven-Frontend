import React from 'react'
import { connect } from 'react-redux'

const MoveOver = ({ task, tasks, list }) => {
  function removeItem(array, index) {
    let newArray = array.slice()
    newArray.splice(index, 1)
    return newArray
  }

  const handleMoveClick = () => {
    console.log(tasks)
    const index = tasks.forEach((t, i) => {
      console.log(i)
      // eslint-disable-next-line
      return t.id == task.id ? i : null
    })
    console.log("old", tasks, index)

    return (
      fetch(`http://localhost:3000/api/v1/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        list_id: list.id,
        id: task.id
      })
    })
    .then(res => res.json())
    .then(response => {
      console.log(response.list.tasks)
    })
  )}

  return (
  <div
    onClick={ () => { handleMoveClick() } }>
    { list.name }
  </div>
  )
}

function msp(state){
  return{
    currentUser: state.currentUser
  }
}

export default connect(msp)(MoveOver)
