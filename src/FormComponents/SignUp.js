import React from 'react';
import {Row, Col, Card, Button } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCurrentUserAction } from '../redux/actions.js'

class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      password_confim: '',
      first_name:'',
      last_name:'',
      email: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    if(this.state.password === this.state.password_confim){
      return (
        fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
          }
        })
      })
      .then(res => res.json())
      .then(response => {
        localStorage.setItem("token", response.jwt)
        this.props.currentUserUpdate(response.user)
        this.props.history.push('/')
      })
      )
    }
  }

  signUpForm(){
  return(
    <Card className='Center'>
      <form onSubmit={this.handleLogin}>
        <label>First Name</label>
        <input onChange={this.handleChange} name="first_name" placeholder='first_name' />
        <label>Last Name</label>
        <input onChange={this.handleChange} name="last_name" placeholder='last_name' />
        <label>Username</label>
        <input onChange={this.handleChange} name="username" placeholder='Username' />
        <label>Password</label>
        <input onChange={this.handleChange} type="password" name="password" placeholder='Password' />
        <label>Password Confirmation</label>
        <input onChange={this.handleChange} type="password" name="password_confim" placeholder='Password Confirmation' />
        <Button className="blue lighten-2">Submit</Button>
      </form>
      <Button className="blue lighten-2" onClick={null}>login</Button>
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
    loggedIn: state.loggedIn
  }
}

function mdp(dispatch){
  return {
    currentUserUpdate: (src) => dispatch(updateCurrentUserAction(src))
  }
}



export default withRouter(connect(msp, mdp)(SignUp))
