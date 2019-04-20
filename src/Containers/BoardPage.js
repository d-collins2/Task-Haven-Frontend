import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'
import { Card , Row, Col} from 'react-materialize'
import ListForm  from '../forms/ListForm.js'
import ListContainer from '../containers/ListContainer.js'
import { updateCurrentUserAction } from '../redux/actions.js'

class BoardPage extends React.Component {
  state = {
    activeItem: null,
    visible: true,
    board: null,
    team: null
  }

  componentDidMount = () => {
    fetch(`http://localhost:3000/api/v1/boards/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        board: response,
        team: response.team
      })
    })
  }
  handleItemClick = name => this.setState({ activeItem: name })
  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handlePushHome = () => this.props.history.push('/home')
  onDragStart = (event, task) => this.setState({dragObject: task})
  onDragOver = (event, list) => event.preventDefault()

render() {
  const {  activeItem, visible, dragObject, board, team } = this.state
  const { currentUser, updateCurrentUserAction } = this.props

  let lists;
  let filteredMembers;
  let filteredBoards;
  let handlePushProfile;
  let onDrop;
  console.log(board)
  if(board){
    filteredMembers = board.team.members_team.sort((a,b) => {
      let x = a.first_name.toLowerCase()
      let y = b.first_name.toLowerCase()
      if (x < y) {return -1}
      if (x > y) {return 1}
      return 0;
    })
  }

  if(team){
    // eslint-disable-next-line
    const sortedBoards = team.boards.filter(boardA => boardA.id != board.id )
    filteredBoards = sortedBoards.sort(function(a,b){
      let x = a.name.toLowerCase()
      let y = b.name.toLowerCase()
      if (x < y) {return -1}
      if (x > y) {return 1}
      return 0;
    })
  }

    // filteredActivities = currentUser.teams_info[board.team_id].activities[board.id].slice(0,9).sort((a, b) => {
    //   return b.id - a.id
    // })

    handlePushProfile = () => this.props.history.push(`/teams/${board.team_id}`)

    onDrop = (event, list) => {
      fetch(`http://localhost:3000/api/v1/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          topic: `Task Updated by ${currentUser.full_name}`,
          list_id: list.id,
          board_id: board.id,
          task_id: dragObject.id
        })
      })
      .then(fetch('http://localhost:3000/api/v1/current_user/', {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(response => updateCurrentUserAction(response))
    )}




  return (
    <Sidebar.Pushable as={Segment} >
      <Sidebar
        as={Menu}
        animation='scale down'
        direction='right'
        icon='labeled'
        inverted
        onHide={this.handleHideClick}
        vertical
        visible = {visible}
        width='wide'
      >
        <Menu.Item as='a' onClick={this.handlePushHome}>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a' onClick={() => handlePushProfile()}>
          <Icon name='user circle' />
          Profile
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='users' />Team Members</Menu.Header>
          <Menu.Menu>
            {board && filteredMembers.map(member => {
              return (
                <Menu.Item
                  key= {member.id}
                  name= {member.first_name}
                  active={activeItem === member.first_name}
                />
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='clipboard list' />Team Boards</Menu.Header>
          <Menu.Menu>
            {board && filteredBoards.map(board => {
              return (
                <Menu.Item
                  key= {board.id}
                  name= {board.name}
                  active={activeItem === board.name}
                  onClick={this.handleItemClick}
                />
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='clipboard list' />Activity</Menu.Header>
          <Menu.Menu>

          </Menu.Menu>
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher >
        <Segment>
          <div className="">
            <div className="center">
              <Button.Group>
                <Button disabled={visible} onClick={this.handleShowClick}>
                  +
                </Button>
                <Button disabled={!visible} onClick={this.handleHideClick}>
                  -
                </Button>
              </Button.Group>
            </div>
            <Row>
              {board && board.lists.map(list => {
                return (
                  <Col key={list.id} s={3}>
                    <Card className=" Center grey lighten-3">
                      <h5 className="">{list.name}</h5>
                      <ListContainer
                        start={this.onDragStart}
                        over={this.onDragOver}
                        drop={onDrop}
                        board={board}
                        list={list}
                      />
                    </Card>
                  </Col>
              )})}
              <Col s={3}>
                {board &&
                  // eslint-disable-next-line
                  (board.lists[board.id].length != 4 ? <ListForm id={board.id}/> : null)}
              </Col>
            </Row>
          </div>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction})(BoardPage))
