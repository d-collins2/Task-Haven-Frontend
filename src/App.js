import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux"
import { Route, Switch, withRouter } from "react-router-dom";
import { updateCurrentUserAction, updateTeamId } from './redux/actions.js'
import BoardPage from './Containers/BoardPage.js'
import HomePageUser from './Containers/HomePageUser.js'
import TeamPage from './Containers/TeamPage.js'
import Login from './Components/Login.js'
import Naviebar from './Components/Naviebar.js'
import SignUp from './Components/SignUp.js'

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



  handleBoardClick = () => {
    console.log("hi")
  }

  signUp = () => <SignUp />

  Login = () => <Login />

  HomePageUser = () => <HomePageUser />

  TeamPage = () => <TeamPage  handleTeamClick={this.handleTeamClick}/>

  BoardPage =  () => <BoardPage />

  render(){
    return (
      <div>
        <Naviebar />
        <Switch>
          <Route exact path='/' render={this.HomePageUser}/>
          <Route exact path='/boards' render={this.HomePageUser}/>
          <Route exact path='/signup' render={this.signUp}/>
          <Route exact path='/login' render={this.Login}/>
          <Route path='/teams/:id' render={this.TeamPage}/>
          <Route path='/boards/:id' render={this.BoardPage}/>
        </Switch>
      </div>
    )
  }
}

function msp (state){
  return{
    currentUser: state.currentUser,
    teamId: state.teamId
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction, updateTeamId})(App))
