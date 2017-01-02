/**
 * Main body of application
 * @export <Body />: component with navigation, header and footer
 */
import React, { Component, PropTypes } from 'react';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

// Css
import '../sass/main.scss';

export class Body extends Component {
  render() {
    return (
      <div id="main">
        <Sidebar />
        <div className="body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// Apply PropTypes
Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};
