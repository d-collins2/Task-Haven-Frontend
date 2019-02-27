import React from 'react';
import { Card , Row, Col} from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import  ListForm  from '../FormComponents/ListForm.js'
import ListContainer from '../Containers/ListContainer.js'

class BoardPage extends React.Component{
  state = {
    board: null
  }
  
  componentDidMount = () => {
    const id = this.props.location.pathname.split('/')[2]
    fetch(`http://localhost:3000/api/v1/boards/${id}`)
    .then(res => res.json())
    .then(response => {
      this.setState({board: response})
    })
  }

  render () {
    const { board } = this.state
    return (
      <Card>
        <Row>
          {board ? board.lists.map(list => {
            return (
              <Col key={list.id} s={3}>
                <Card className=" Center cardOver">
                  <h5 className="">{list.name}</h5>
                  <ListContainer list={list}/>
                </Card>
              </Col>
          )}): null}
          <Col s={3}>
            {board ? <ListForm id={board.id}/> : null}
          </Col>
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


export default withRouter(connect(msp)(BoardPage))
