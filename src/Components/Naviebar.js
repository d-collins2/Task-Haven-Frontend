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

  return (
    <Navbar brand='FinalPro' className="NavBar" right>
      {currentUser && (
        <>
          <NavItem className="disabled" href={null}>
              {currentUser && `Welcome! ${currentUser.full_name}`}
          </NavItem>
          <NavItem href='/' icon=""><Icon medium>home</Icon></NavItem>
          <NavItem href='/home' icon="dashboard"><Icon medium>dashboard</Icon></NavItem>
          <NavItem href='/profile' icon="face"><Icon medium>face</Icon></NavItem>
          <NavItem
            href='/login'
            onClick={() => handleLogOut()}
          >
            <Icon medium>keyboard_tab</Icon>
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
