 // JSX file for navbar
import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { isMobile } from '../util/mobile';
import { Sidebar, SidebarItem } from './navbar/sidebar';
import { Hamburger } from './hamburger';
import { ItemIcon as NavItemIcon } from './navbar/item';
import { Username } from './username';
import Gravatar from 'react-gravatar';
// import { Hero } from './navbar/sidebar/hero';
// Css (sass)
import '../../sass/navbar.scss';


export const SidebarNav = React.createClass({
  // Set state
  getInitialState() {
    return {
      open: false,
      body: null
    };
  },

  componentDidMount() {
    this.onMount();
  },

  onMount() {
    this.setState({ open: false, body: $('.page-body').width()});
  },

  // Click method
  handleClick() {
    // Handle clicking of hamburger
    if (this.state.open === false) {
      $(".hamburger").addClass("is-active");
      // Animate
      if (isMobile()) {
        $(".page-body").animate({ marginLeft: "100%" });
      } else {
        $(".page-body").animate({ marginLeft: 250, width: this.state.body - (250 - 60) });
      }
      // Set state to being open
      this.setState({ open: true });
    } else {
      $(".hamburger").removeClass("is-active");
      // Animate
      $(".page-body").animate({ marginLeft: 60, width: this.state.body });
      // Set state to being closed
      this.setState({ open: false });
    }
  },

  // Render
  render() {
    return (
      <Sidebar>
        <SidebarItem appendClass="hamburger-li">
          {/* Hamburger menu icon */}
          <Hamburger type="vortex" click={this.handleClick} />
          <h2 className="inline">Bedel</h2>
        </SidebarItem>
        {/*<Hero />*/}
        <SidebarItem url="/"><FontAwesome name="dashboard" /> Dashboard</SidebarItem>
        <SidebarItem url="/apps"><FontAwesome name="cube" /> Apps</SidebarItem>
        <SidebarItem url="/signout" normal><FontAwesome name="sign-out" /> Sign Out</SidebarItem>
      </Sidebar>
    );
  }
});

// Normal navbar
export class Navigater extends Component {
  render() {
    return (
      <Navbar className="navigater">
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItemIcon href="/notifications" icon="bell" />
            <NavDropdown id="#dropdown" title={<Username prefix="Hello," user={this.props.user} suffix={<Gravatar email={this.props.user.email} />} />} className="navbar-dropdown">
              <MenuItem><NavItemIcon href="/settings/profile" icon="user" text="Profile" /></MenuItem>
            </NavDropdown>
            <NavItemIcon href="/signout" icon="sign-out" normal />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigater.PropTypes = {
  user: PropTypes.object.isRequired
};
