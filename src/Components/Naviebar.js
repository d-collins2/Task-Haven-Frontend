import React from 'react';
import { Navbar, NavItem } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../redux/actions.js'
import { Icon } from 'semantic-ui-react'

const Naviebar = ({currentUser, logout, history}) => {
  const handleLogOut = () => {
    localStorage.removeItem("token")
    logout()
    history.push('/login')
  }

  return (
    <Navbar brand='Task Haven' className="NavBar" right>
      {currentUser && (
        <>
          <NavItem className="disabled" href={null}>
              {currentUser && `Welcome! ${currentUser.full_name}`}
          </NavItem>
          <NavItem href='/' ><Icon name='home'/></NavItem>
          <NavItem href='/profile'><Icon name='user' /></NavItem>
          <NavItem href='/login' onClick={() => handleLogOut()}>
            <Icon name="log out"/>
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
