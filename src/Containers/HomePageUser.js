import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCurrentUserAction} from '../redux/actions.js'
import { Row, Col } from 'react-materialize'
import BoardContainer from './BoardContainer.js'
import RightToolBar from '../Components/RightToolBar.js'

class HomePageUser extends React.Component {
  cardInfo = () => {
    return <span>{this.props.currentUser.full_name}</span>
  }
  render(){
    const {currentUser} = this.props
    return (
    <>

      <Row>
        <Col  s={3} >
          <RightToolBar currentUser={currentUser}/>
        </Col>
        <Col s={9} >
          <BoardContainer />
        </Col>
      </Row>
    </>
    )
  }
}

function msp (state){
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction})(HomePageUser))
