import React from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../redux/actions.js'

const Naviebar = ({currentUser, logout, history}) => {
  const handleLogOut = () => {
    localStorage.removeItem("token")
    logout()
    history.push('/login')
  }

  const handleModule = () => {
    history.push('/boards')
  }

  return (
    <Navbar brand='{-_-}' className="NavBar" right>
      <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
      <NavItem href='get-started.html' onClick={() => handleModule()}><Icon>view_module</Icon></NavItem>
      {currentUser ? <NavItem href='get-started.html' onClick={() => handleLogOut()}>LogOut</NavItem> : null}
    </Navbar>
  )
}

const msp = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {logout})(Naviebar))
