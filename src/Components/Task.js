import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Modal } from 'react-materialize'
import Button from '@material-ui/core/Button'

const Task = ({task, history}) => {
  return (

    <Modal
      header='Modal Header'
      trigger={<Card className="cardOver"><p>{task.name}</p></Card>}>
        <form onSubmit={null}>
          <label>Name</label>
          <input onChange={null} name="name" placeholder='name' />
          <Button variant="contained" color="primary">Submit</Button>
        </form>
    </Modal>
  )
}

export default withRouter(Task)
