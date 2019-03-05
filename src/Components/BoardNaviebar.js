import React from 'react';
import { Navbar, NavItem, Icon, SideNav, SideNavItem, Button } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../redux/actions.js'

const BoardNavbar = ({currentUser, logout, history}) => {
  return (
    <Navbar className="NavBar" right>
        <>
        <SideNav
          trigger={<Icon>menu</Icon>}
          options={{ closeOnClick: true }}
          >
          <SideNavItem userView
            user={{
        
            }}
          />
          <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
          <SideNavItem href='#!second'>Second Link</SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader>Subheader</SideNavItem>
          <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
        </SideNav>
        </>
    </Navbar>
  )
}

const msp = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {logout})(BoardNavbar))
