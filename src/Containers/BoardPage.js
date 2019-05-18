import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateBoard, updateLists } from '../redux/actions.js'
import { Card , Col, Row } from 'react-materialize'
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import ListForm  from '../forms/ListForm.js'
import ListContainer from '../containers/ListContainer.js'

class BoardPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeItem: null,
      visible: true,
    }
    this.filterdedBoards.bind(this)
    this.filteredMembers.bind(this)
    this.handleItemClick.bind(this)
    this.handleHideClick.bind(this)
    this.handlePushHome.bind(this)
    this.handlePushProfile.bind(this)
    this.handleShowClick.bind(this)
    this.onDragOver.bind(this)
    this.onDragStart.bind(this)
    this.updateList.bind(this)
  }

  componentDidMount = () => {
    const id = this.props.match.params.id
    fetch(`http://localhost:3000/api/v1/boards/${id}`)
    .then(res => res.json())
    .then(board => {
      this.props.updateBoard(board)
      this.props.updateLists(board.lists)
    })
  }

  handleItemClick = name => this.setState({ activeItem: name })
  handleHideClick = () => this.setState({ visible: false })
  handlePushProfile = () => this.props.history.push(`/teams/${this.props.board.team_id}`)
  handleShowClick = () => this.setState({ visible: true })
  handlePushHome = () => this.props.history.push('/home')
  onDragStart = (event, task) => this.setState({ dragObject: task })
  onDragOver = (event, list) => event.preventDefault()

  onDrop = (event, list) => {
    const {  dragObject } = this.state
    const { currentUser, board } = this.props

    fetch(`http://localhost:3000/api/v1/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        topic: `Task Updated by ${ currentUser.full_name }`,
        list_id: list.id,
        board_id: board.id,
        id: dragObject.id
      })
    })
    .then(res => res.json())
    .then(response => {
      this.updateList(list, dragObject, response)
    })
  }

  updateList = (newList, task, response) => {
    const remove = [...this.props.lists].map(list => {
      if(list.id === task.list_id) {
        const index = list.tasks.findIndex(t => t.id === task.id)
        list.tasks.splice(index, 1)
      }
      return list
    })

    const addTaskToList = remove.map(list => {
      if(list.id === newList.id) {
        list.tasks.push(response)
      }
      return list
    })

    this.props.updateLists(addTaskToList)
  }

  filteredBoards(){
    if(this.props.board){
      // eslint-disable-next-line
      const sortedBoards = [...this.props.board.team.boards].filter(boardA => boardA.id != board.id )
      return sortedBoards.sort((a,b) => {
        let x = a.name.toLowerCase()
        let y = b.name.toLowerCase()
        if (x < y) { return -1 }
        if (x > y) { return 1 }
        return 0;
      })
    }
  }

  filteredMembers(){
    if(this.props.board) {
      // eslint-disable-next-lin
      return [...this.props.board.team.members_team].sort((a,b) => {
        let x = a.first_name.toLowerCase()
        let y = b.first_name.toLowerCase()
        if (x < y) { return -1 }
        if (x > y) { return 1 }
        return 0;
      })
    }
  }


render() {
  const { activeItem, visible } = this.state
  const { board, lists } = this.props

  let handlePushProfile;
  let onDrop
  return (
    <Sidebar.Pushable as={ Segment } >
      <Sidebar
        as={ Menu }
        animation='scale down'
        direction='right'
        icon='labeled'
        inverted
        onHide={ this.handleHideClick }
        vertical
        visible={ visible }
        width='wide'
      >
        <Menu.Item as='a' onClick={ this.handlePushHome }>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a' onClick={ () => handlePushProfile() }>
          <Icon name='user circle' />
          Profile
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='users'/>Team Members</Menu.Header>
          <Menu.Menu>
            { board && this.filteredMembers.map(member => {
              return (
                <Menu.Item
                  key= { member.id }
                  name= { member.first_name }
                  active={ activeItem === member.first_name }
                />
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header><Icon name='clipboard list' />Team Boards</Menu.Header>
          <Menu.Menu>
            {board && this.filteredBoards.map(board => {
              return (
                <Menu.Item
                  key= { board.id }
                  name= { board.name }
                  active={ activeItem === board.name }
                  onClick={ this.handleItemClick }
                />
              )
            })}
          </Menu.Menu>
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher >
        <Segment>
          <div>
            <div className="center">
              <Button.Group>
                <Button disabled={ visible } onClick={ this.handleShowClick }>
                  +
                </Button>
                <Button disabled={ !visible } onClick={ this.handleHideClick }>
                  -
                </Button>
              </Button.Group>
            </div>
            <Row>
              { lists && lists.map(list => {
                return (
                  <Col key={ list.id } s={3}>
                    <Card className="center grey lighten-3">
                      <h5>{ list.name }</h5>
                      <ListContainer
                        start={ this.onDragStart }
                        over={ this.onDragOver }
                        drop={ onDrop }
                        list={ list }
                        updateList = { this.updateList }
                      />
                    </Card>
                  </Col>
              )})}
              <Col s={3}>
                { lists &&
                  // eslint-disable-next-line
                  (lists.length < 4 ? <ListForm/> : null)
                }
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
    currentUser: state.currentUser,
    board: state.board,
    lists: state.lists
  }
}

export default withRouter(connect(msp, {updateBoard, updateLists})(BoardPage))
