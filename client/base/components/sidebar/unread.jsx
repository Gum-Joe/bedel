// JSX for unread components
import React, { Component, PropTypes } from 'react';

// Component
export class UnreadCount extends Component {
  render() {
    return this.props.text > 0 ?
      (<span className="badge unread-badge">{this.props.text}</span>) : (<div></div>);
  }
}

UnreadCount.propTypes = {
  text: PropTypes.number.isRqeuired
};
