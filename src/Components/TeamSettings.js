import React from 'react'
import { withRouter } from 'react-router'
import {
  Button,
  Col,
  Collapsible,
  CollapsibleItem,
  Icon,
  Row } from 'react-materialize'

const TeamSettings = ({ history, match }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/teams/${ match.params.id }`, { method: 'DELETE' })
    .then( history.push('/home') )
    .then( window.location.reload())
  }

  return(
    <Row>
      <Col s={3}></Col>
      <Col className="Center" s={6}>
        <Collapsible accordion>
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

export default withRouter(TeamSettings)
