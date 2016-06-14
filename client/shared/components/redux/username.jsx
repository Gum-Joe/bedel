// Username component
import React, { PropTypes } from 'react';

// Component
export default React.createClass({
  propTypes: {
    username: PropTypes.string.isRequired
  },
  render() {
    return (
      <p>{this.props.username}</p>
    );
  }
});
