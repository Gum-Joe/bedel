 // JSX file for navbar
 /* eslint react/jsx-no-bind: 0 */
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
        <SidebarItem appendClass="hamburger-li" noLink>
          {/* Hamburger menu icon */}
          <Hamburger type="vortex" click={this.handleClick} />
          <h2 className="inline">Bedel</h2>
        </SidebarItem>
        {/*<Hero />*/}
        <SidebarItem href="/"><FontAwesome name="dashboard" /> Dashboard</SidebarItem>
        <SidebarItem href="/apps"><FontAwesome name="cube" /> Apps</SidebarItem>
      </Sidebar>
    );
  }
});

// Normal navbar
export class Navigater extends Component {
  onBellClick() {
    this.props.updateStatus({
      sidebar: Object.assign(this.props.status.sidebar, {
        open: true,
        alreadyOpened: true,
        tab: 0
      })
    });
  }
  onTasksClick() {
    this.props.updateStatus({
      sidebar: Object.assign(this.props.status.sidebar, {
        open: true,
        alreadyOpened: true,
        tab: 1
      })
    });
  }
  render() {
    return (
      <Navbar className="navigater">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItemIcon eventKey={1} href="#" icon="bell" onClick={this.onBellClick.bind(this)} normal />
            <NavItemIcon eventKey={1} href="#" icon="tasks" onClick={this.onTasksClick.bind(this)} normal />
            <NavDropdown eventKey={2} id="#dropdown" title={<Username prefix="Hello," user={this.props.user} suffix={<Gravatar email={this.props.user.email} />} />} className="navbar-dropdown">
              <NavItemIcon eventKey={2.1} href="/settings/profile" icon="user" text="Profile" />
              <NavItemIcon eventKey={2.2} href="/signout" icon="sign-out" text="Sign Out" normal />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigater.propTypes = {
  status: PropTypes.object.isRequired,
  updateStatus: PropTypes.func,
  user: PropTypes.object.isRequired
};
