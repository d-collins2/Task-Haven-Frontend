import React from 'react';
import { Card, Row, Col, Button } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCurrentUserAction } from '../redux/actions.js'
import { SignUp } from './SignUp.js'
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
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
        Accept: 'application/json'
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
        this.props.history.push('/boards')
      }})
    )
  }

  signUpForm(){
  return(
    <Card>
      <form onSubmit={this.handleLogin}>
        <label>Username</label>
        <input onChange={this.handleChange} name="username" placeholder='Username' />
          <label>Password</label>
          <input onChange={this.handleChange} type="password" name="password" placeholder='Password' />
        <Button className="blue lighten-2">Submit</Button>
      </form>
      <Button className="blue lighten-2" onClick={null}>SignUp</Button>
    </Card>
  )
}


  render(){
    console.log(this.state, this.props);
    return (
      <Row>
        <Col s={5}></Col>
        <Col s={4}>
          {this.signUpForm()}
        </Col>
      </Row>
    )
  }
}


function msp (state){
  return{
    currentUser: state.currentUser,
    signUp: state.signUp
  }
}

function mdp(dispatch){
  return {
    currentUserUpdate: (src) => dispatch(updateCurrentUserAction(src))
  }
}



export default withRouter(connect(msp, mdp)(Login))
