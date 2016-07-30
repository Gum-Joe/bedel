 // JSX file for navbar
 /* eslint react/jsx-no-bind: 0 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { isMobile } from '../util/mobile';
import { Sidebar, SidebarItem } from './navbar/sidebar';
import { Hamburger } from './hamburger';
import { ItemIcon as NavItemIcon } from './navbar/item';
import { Username } from './username';
import { UnreadCount } from './sidebar/unread';
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
      // Animate
      if (isMobile()) {
        $(".page-body").animate({ marginLeft: "100%" });
      } else {
        $(".page-body").animate({ marginLeft: 250, width: this.state.body - (250 - 60) });
      }
      // Set state to being open
      this.setState({ open: true });
    } else {
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
          <Hamburger
            className={
              classnames({'is-active': this.state.open})
            }
            type="vortex"
            click={this.handleClick}
          />
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
    this.props.minus('unreadNotifications', this.props.counter.unreadNotifications);
  }
  onTasksClick() {
    this.props.updateStatus({
      sidebar: Object.assign(this.props.status.sidebar, {
        open: true,
        alreadyOpened: true,
        tab: 1
      })
    });
    this.props.minus('unseenTasks', this.props.counter.unseenTasks);
  }
  render() {
    return (
      <Navbar className="navigater">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItemIcon
              eventKey={1}
              href="#"
              text={<UnreadCount text={this.props.counter.unreadNotifications} />}
              icon="bell"
              onClick={this.onBellClick.bind(this)}
              normal
            />
            <NavItemIcon
              eventKey={1}
              href="#"
              text={<UnreadCount text={this.props.counter.unseenTasks} />}
              icon="tasks"
              onClick={this.onTasksClick.bind(this)}
              normal
            />
            <NavDropdown eventKey={2} id="#dropdown" title={<Username prefix="Hello," user={this.props.user} suffix={<Gravatar email={this.props.user.email} />} />} className="navbar-dropdown">
              <NavItemIcon eventKey={2.1} href="/settings/profile" icon="user" text="Profile" />
            </NavDropdown>
            <NavItemIcon eventKey={3} href="/signout" icon="sign-out" normal />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigater.propTypes = {
  counter: PropTypes.object.isRequired,
  minus: PropTypes.func.isRequired,
  plus: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  updateStatus: PropTypes.func,
  user: PropTypes.object.isRequired
};
