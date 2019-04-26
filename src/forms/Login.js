import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCurrentUserAction } from '../redux/actions.js'
import { Button } from 'semantic-ui-react'
import {
  Card,
  Col,
  Row,
  Input } from 'react-materialize'


class Login extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleClick = () => {
    this.props.history.push('/signup')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    localStorage.setItem("token", null)
    return (
      fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
         username: this.state.username,
         password: this.state.password
        }
      })
    })
    .then(res => res.json())
    .then(response => {
      if(response.message){
        alert(response.message)
      } else {
        localStorage.setItem("token", response.jwt )
        this.props.currentUserUpdate(response.user)
        this.props.history.push('/home')
      }})
    )
  }

  loginForm(){
  return(
      <Card className="Center login" >
        <Row >
          <Input
            onChange={this.handleChange}
            s={6}
            label='Username'
            type='name'
            name='username'
            placeholder='Username' />
          <Input
            onChange={this.handleChange}
            s={6}
            label='Password'
            type='password'
            name='password'
            placeholder='Password' />
          <Button.Group>
            <Button onClick={this.handleLogin} positive>Submit</Button>
            <Button.Or />
            <Button className="blue lighten-2" onClick={this.handleClick}>Sign Up</Button>
          </Button.Group>
        </Row>
      </Card>
    )
  }

  render(){
    return (
      <div className="">
        <Row>
          <Col s={4}></Col>
          <Col s={4}>
            {this.loginForm()}
          </Col>
        </Row>
      </div>
    )
  }
}

function msp (state){
  return{
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction})(Login))
