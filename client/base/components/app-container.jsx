/**
 * App container
 * Runs the app to run
 * @export AppContainer {Class} Container for apps
 */
import React, { Component, PropTypes } from 'react';
import AppLoader from './app-loader';

export default class AppContainer extends Component {
  render() {
    if (this.props.location.pathname === "/apps") {
      // Render app lancher
    } else {
      return (
        <AppLoader app={this.props.location.pathname.split('/')[2]} />
      );
    }
  }
};

AppContainer.propTypes = {
  location: PropTypes.object.isRequired
};
