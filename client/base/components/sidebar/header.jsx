// Header for sidebar
import React, { Component, PropTypes } from 'react';

// Component
export class SidebarHeader extends Component {
  render() {
    return (
      <div className="notify-header">
        <h3>
          <button onClick={() => this.props.updateStatus({ sidebar: { open: false, alreadyOpened: true } })} className="not-a-button close-notify-bar">
            <span>&times;</span>
          </button> {this.props.header}
        </h3>
        {this.props.children}
      </div>
    );
  }
}

SidebarHeader.propTypes = {
  children: PropTypes.object,
  header: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired
};
