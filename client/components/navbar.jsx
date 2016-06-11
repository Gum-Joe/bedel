// JSX file for navbar
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Sidebar, SidebarItem } from './sidebar';
import { Hero } from './sidebar/hero';
// Css (sass)
import '../sass/navbar.scss';


export const SidebarNav =  React.createClass({
  // Set state
  getInitialState() {
    return {
      open: false
    };
  },
  // Render
  render() {
    return (
      <Sidebar>
        <SidebarItem appendClass="hamburger-li">
          {/* Hamburger menu icon */}
          <button className="hamburger hamburger--vortex" type="button" onClick={this.handleClick}>
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </SidebarItem>
        {/*<Hero />*/}
        <SidebarItem url="/"><FontAwesome name="dashboard" /> Dashboard</SidebarItem>
        <SidebarItem url="/apps"><FontAwesome name="cube" /> Apps</SidebarItem>
        <SidebarItem url="/signout" normal><FontAwesome name="sign-out" /> Sign Out</SidebarItem>
      </Sidebar>
    );
  },

  // Click method
  handleClick() {
    // Handle clicking of hamburger
    if (this.state.open === false) {
      $(".hamburger").addClass("is-active");
      // Animate
      $(".page-body").animate({ marginLeft: 250 });
      // Set state to being open
      this.setState({ open: true });
    } else {
      $(".hamburger").removeClass("is-active");
      // Animate
      $(".page-body").animate({ marginLeft: 60 });
      // Set state to being closed
      this.setState({ open: false });
    }
  }
});

// Normal navbar
export class Navigater extends Component {
  render() {
    return (
      <Navbar className="navigater">
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" id="hamburger-nav">TODO</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
