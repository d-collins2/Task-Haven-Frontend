import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCurrentUserAction} from '../redux/actions.js'
import { Row, Col } from 'react-materialize'
import BoardContainer from './BoardContainer.js'
import RightToolBar from '../Components/RightToolBar.js'

class HomePageUser extends React.Component {
  render(){
    return (
      <Row>
        <Col  s={2} >
          <RightToolBar currentUser={this.props.currentUser}/>
        </Col>
        <Col s={10} >
          <BoardContainer />
        </Col>
      </Row>
    )
  }
}

function msp (state){
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction})(HomePageUser))
