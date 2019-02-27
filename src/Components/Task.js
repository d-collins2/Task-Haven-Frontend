import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Modal, Button, Row, Col, Collection, CollectionItem } from 'react-materialize'

// Add Functionality
class Task  extends React.Component{

  handleMoveClick(){
    console.log(this.props.board)
  }

  render(){
    const {task, board} = this.props
    console.log( this.props);
    return (
      <Modal
        className='Center'
        header={task.name}
        trigger={<Card className="cardOver"><p>{task.name}</p></Card>}>
          <Row>
            <Col s={2} m={8}>
              <form onSubmit={null}>
                <label>Name</label>
                <input onChange={null} name="name" placeholder='name' />
                <Button className="blue lighten-2">Submit</Button>
              </form>
            </Col>
            <Col s={3} m={3}>
              <Card className="z-depth-1" >
                <Modal
                  className='Center'
                  header={task.name}
                  trigger={<Card className="cardOver"><p>{task.name}</p></Card>}>
                  <Collection defaultValue="1">
                    {board && board.lists.map(list => {
                      return  <CollectionItem  value={list.id} >{list.name}<Button onClick={(value)=>{this.handleMoveClick(value)}}>move</Button></CollectionItem>
                    })}
                   </Collection>
                </Modal><br/>
              </Card>
            </Col>
          </Row>
      </Modal>
    )
  }
}

export default withRouter(Task)
