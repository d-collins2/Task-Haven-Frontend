import React from 'react'
import { Collapsible, CollapsibleItem, Row, Col, Button, Icon } from 'react-materialize'
import { withRouter } from 'react-router'

class TeamSettings
 extends React.Component{
  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/teams/${this.props.match.params.id}`, { method: 'DELETE' })
    .then( window.location.reload())
    .then(this.props.history.push('/profile'))
  }

  render(){
    return(
      <Row>
        <Col s={3}></Col>
        <Col className="Center" s={6}>
          <Collapsible accordion>
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

export default withRouter(TeamSettings)
