// Username component
import React, { Component, PropTypes } from 'react';

// Export
export class Username extends Component {
  render() {
    return (
      <span>{this.props.prefix} {this.props.user.name} {this.props.suffix}</span>
    );
  }
}

// PropTypes
Username.propTypes = {
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  user: PropTypes.object.isRequired
};
