// JSX for sidebar
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// CSS
import '../../../sass/sidebar.scss';

// Sidebar item
export class SidebarItem extends Component {
  render() {
    if (this.props.normal) {
      return (
        <a href={this.props.url || '#'} className={"sidebar-item "+this.props.appendClass}>
          <li>{this.props.children}</li>
        </a>
      );
    } else {
      return (
        <Link to={this.props.url || '#'} className={"sidebar-item "+this.props.appendClass}>
          <li>{this.props.children}</li>
        </Link>
      );
    }
  }
}
// Prop types
SidebarItem.propTypes = {
  appendClass: PropTypes.string,
  children: PropTypes.object.isRequired,
  normal: PropTypes.bool,
  url: PropTypes.string.isRequired
};

// Sidebar item
export class SidebarItemHero extends Component {
  render() {
    return (
      <Link to={this.props.url || '#'} className="sidebar-item">
        <li className="sidebar-hero-container">{this.props.children}</li>
      </Link>
    );
  }
}
// Prop types
SidebarItemHero.propTypes = {
  children: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};


// Sidebar class
export class Sidebar extends Component {
  render() {
    return (
      <ul className={`sidebar ${this.props.appendClass}`}>
        {this.props.children}
      </ul>
    );
  }
}
// Prop types
Sidebar.propTypes = {
  appendClass: PropTypes.string,
  children: PropTypes.object.isRequired
};
