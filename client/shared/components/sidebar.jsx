// JSX for sidebar
import React, { Component } from 'react';
import { Link } from 'react-router';
// CSS
import '../../sass/sidebar.scss';

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


// Sidebar class
export class Sidebar extends Component {
  render() {
    return (
      <ul className="sidebar">
        {this.props.children}
      </ul>
    );
  }
}
