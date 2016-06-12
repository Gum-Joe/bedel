// JSX file for navbar
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { isMobile } from '../util/mobile';
import { Sidebar, SidebarItem } from './sidebar';
import { Hamburger } from './hamburger';
import { ItemIcon as NavItemIcon } from './navbar/item';
import { Hero } from './sidebar/hero';
// Css (sass)
import '../sass/navbar.scss';


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
            <NavItemIcon href="/signout" icon="sign-out" normal />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
