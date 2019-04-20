import React from 'react'
import { updateCurrentUserAction } from '../redux/actions.js'
import { connect } from 'react-redux'
import { Input, Row, Icon } from 'react-materialize'
import { Button } from 'semantic-ui-react'

class EditUser extends React.Component {
  state={
    first_name: null,
    last_name: null,
    email : null,
    username : null,
    currentPassword : null,
    newPassword : null,
    img_url: null
  }

  componentDidMount(){
    if(this.props.currentUser){
      const {currentUser} = this.props
      this.setState({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        username: currentUser.username,
        img_url: currentUser.img_url
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { first_name, last_name, username, email, img_url} = this.state

    if(this.props.currentUser){
      return (
        fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          username: username,
          email: email,
          img_url: img_url
        })
      })
      .then(window.location.reload())
    )}
  }

  render(){
    const { currentUser } = this.props
    return (
      <form>
        <Row>
          <Input onChange={this.handleChange} name="first_name" s={6} label="First Name" placeholder={ currentUser && currentUser.first_name }><Icon>person</Icon></Input>
          <Input onChange={this.handleChange} name="last_name" s={6} label="Last Name" placeholder={ currentUser && currentUser.last_name }><Icon>person</Icon></Input>
          <Input onChange={this.handleChange} name="username" s={12} label="Username" placeholder={ currentUser && currentUser.username }><Icon>account_circle</Icon></Input>
          <Input onChange={this.handleChange} name="currentPassword" type="password" label="Current Password" s={12}><Icon>security</Icon></Input>
          <Input onChange={this.handleChange} name="newPassword" type="password" label="New Password" s={12}><Icon>security</Icon></Input>
          <Input onChange={this.handleChange} name="email" type="email" label="Email" s={12} placeholder={ currentUser && currentUser.email }><Icon>email</Icon></Input>
          <Input onChange={this.handleChange} name="img_url" label="Image" s={12} placeholder={ currentUser && currentUser.img_url }><Icon>add_a_photo</Icon></Input>
          <Button onClick={this.handleSubmit} className="blue lighten-2">Submit</Button>
        </Row>
      </form>
    )
  }
}
function msp(state){
  return{
    currentUser: state.currentUser
  }
}

export default connect(msp, {updateCurrentUserAction})(EditUser)
