import React from 'react';
import { Navbar, NavItem } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../redux/actions.js'

const Naviebar = ({currentUser, logout, history}) => {
  const handleLogOut = () => {
    localStorage.removeItem("token")
    logout()
    history.push('/login')
  }

  return (
    <Navbar brand='{-_-}' className="NavBar" right>
      {currentUser && (
        <>
          <NavItem href='/'>Boards</NavItem>
          <NavItem href='/home'>Home</NavItem>
          <NavItem
            href='/login'
            onClick={() => handleLogOut()}
          >
            LogOut
          </NavItem>
        </>
      )}
    </Navbar>
  )
}

const msp = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {logout})(Naviebar))
