// JSX for sidebar
/* eslint react/prop-types: 0 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// CSS
import '../../../sass/sidebar.scss';

// Default link
const DEFAULT_LINK = "#";
const DEFAULT_CLASSES = "sidebar-item";

// Sidebar item
export class SidebarItem extends Component {
  makeChildren(children) {
    return (
      <li>{children}</li>
    );
  }

  makeClasses(classes) {
    return `${DEFAULT_CLASSES} ${classes}`;
  }

  render() {
    if (this.props.normal) {
      return (
        <a href={this.props.href || DEFAULT_LINK} className={this.makeClasses(this.props.appendClass)}>
          {this.makeChildren(this.props.children)}
        </a>
      );
    } else if (this.props.noLink) {
      return (
        <div className={this.makeClasses(`sidebar-item-button ${this.props.appendClass}`)}>
          <li>{this.props.children}</li>
        </div>
      );
    } else {
      return (
        <Link to={this.props.href || DEFAULT_LINK} className={this.makeClasses(this.props.appendClass)}>
          {this.makeChildren(this.props.children)}
        </Link>
      );
    }
  }
}
// Prop types
SidebarItem.propTypes = {
  appendClass: PropTypes.string,
  normal: PropTypes.bool,
  href: PropTypes.string
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
  appendClass: PropTypes.string
};
