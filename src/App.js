import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux"
import { Route, Switch, withRouter } from "react-router-dom";
import { updateCurrentUserAction } from './redux/actions.js'
import BoardPage from './containers/BoardPage.js'
import HomePageUser from './containers/HomePageUser.js'
import UserProfile from './containers/UserProfile.js'
import TeamPage from './containers/TeamPage.js'
import Naviebar from './components/Naviebar.js'
import Login from './forms/Login.js'
import SignUp from './forms/SignUp.js'

document.body.id = "b1"
class App extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("token")

    if (token) {
      fetch('http://localhost:3000/api/v1/current_user/', {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        this.props.updateCurrentUserAction(response)
      })
    } else {
      this.props.history.push('/login')
    }
  }

  render(){
      return (
        <div>
          <Naviebar />
          <Switch>
            <Route exact path='/' component={HomePageUser}/>
            <Route path='/home' component={HomePageUser}/>
            <Route path='/profile' component={UserProfile}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={Login}/>
            <Route path='/teams/:id' render={TeamPage}/>
            <Route path='/boards/:id' render={BoardPage}/>
          </Switch>
        </div>
      )
    }
  }

  function msp (state){
    return{
      currentUser: state.currentUser
    }
  }

  export default withRouter(connect(msp, {updateCurrentUserAction})(App))
