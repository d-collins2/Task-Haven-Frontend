import React from 'react'
import { Collapsible, CollapsibleItem, Row, Col, Button, Icon } from 'react-materialize'
import TeamForm from "../FormComponents/TeamForm.js"
import EditUser from "../FormComponents/EditUser.js"


class UserSettings extends React.Component{
  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/user/${this.props.currentUser.id}`, { method: 'DELETE' })
    this.props.history.push('/signup')
  }

  render(){
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
            <CollapsibleItem header='Add Team' icon='add'>
              <TeamForm />
            </CollapsibleItem>
            <CollapsibleItem header='Delete' icon='delete_forever'>
              <span>"WARNING: This is a permanent deletion."</span><br/><br/>
              <Button onClick={ this.handleDelete } className="red"><Icon large>delete</Icon></Button>
            </CollapsibleItem>
          </Collapsible>
        </Col>
      </Row>
    )
  }
}

export default UserSettings
