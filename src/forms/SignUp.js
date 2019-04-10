import React from 'react';
import {Row, Col, Card } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCurrentUserAction } from '../redux/actions.js'
import { Button } from 'semantic-ui-react'


class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      password_confim: '',
      first_name:'',
      last_name:'',
      email: '',
      img_url: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = () => {
    this.props.history.push('/login')
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
            email: this.state.email,
            img_url: this.state.img_url
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
    <Card className='Center signup'>
      <form header="Sign Up" onSubmit={this.handleLogin}>
        <label>First Name</label>
        <input onChange={this.handleChange} name="first_name" placeholder='first_name' />
        <label>Last Name</label>
        <input onChange={this.handleChange} name="last_name" placeholder='last_name' />
        <label>Email</label>
        <input onChange={this.handleChange} name="email" placeholder='email' />
        <label>Username</label>
        <input onChange={this.handleChange} name="username" placeholder='Username' />
        <label>Image</label>
        <input onChange={this.handleChange} name="img_url" placeholder='Image' />
        <label>Password</label>
        <input onChange={this.handleChange} type="password" name="password" placeholder='Password' />
        <label>Password Confirmation</label>
        <input onChange={this.handleChange} type="password" name="password_confim" placeholder='Password Confirmation' />
          <Button.Group>
            <Button onClick={this.handleLogin} positive>Submit</Button>
            <Button.Or />
            <Button className="blue lighten-2" onClick={this.handleClick}>Login</Button>
          </Button.Group>
      </form>

    </Card>
  )
}


  render(){
    console.log(this.state, this.props);
    return (
      <div className="">
      <Row>
        <Col s={3}></Col>
        <Col s={6}>
          {this.signUpForm()}
        </Col>
      </Row>
    </div>
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
