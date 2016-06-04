// JSX for sidebar
import React, { Component } from 'react';
// CSS
import '../sass/sidebar.scss';

// Sidebar item
export class SidebarItem extends Component {
  render() {
    return (
      <a href={this.props.url} className="sidebar-item">
        <li>{this.props.children}</li>
      </a>
    );
  }
}

// Sidebar item
export class SidebarItemHero extends Component {
  render() {
    return (
      <a href={this.props.url} className="sidebar-item">
        <li className="sidebar-hero-container">{this.props.children}</li>
      </a>
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
