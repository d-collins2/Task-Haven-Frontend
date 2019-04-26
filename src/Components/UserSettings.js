import React from 'react'
import EditUser from "../forms/EditUser.js"
import {
  Button,
  Col,
  Collapsible,
  CollapsibleItem,
  Icon,
  Row } from 'react-materialize'


const UserSettings = ({ currentUser, history }) => {

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/user/${ currentUser.id }`, { method: 'DELETE' })
    .then(history.push('/signup'))
  }

  return(
    <Row>
      <Col s={3}></Col>
      <Col className="Center" s={6}>
        <Collapsible accordion>
          <CollapsibleItem header='Edit Profiles' icon='edit'>
            <Row>
              <EditUser />
            </Row>
          </CollapsibleItem>
          <CollapsibleItem header='Delete' icon='delete_forever'>
            <span>"WARNING: This is a permanent deletion."</span><br/><br/>
            <Button
              onClick={ handleDelete }
              className="red">
              <Icon large>delete</Icon>
            </Button>
          </CollapsibleItem>
        </Collapsible>
      </Col>
    </Row>
  )
}

export default UserSettings
