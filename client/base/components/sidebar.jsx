// Sidebar Component for notifications
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Sidebar as SidebarBase } from './navbar/sidebar';
import { Notifications } from '../containers/Notifications';
// Export
export class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  componentDidMount() {
    this.props.updateStatus({
      sidebar: {
        open: false
      }
    });
    setInterval(this.updateState.bind(this), 100);
  }
  updateState() {
    this.setState({
      open: this.props.status.sidebar.open
    });
  }
  render() {
    return (
      <SidebarBase
        appendClass={
          classnames('notifications-bar', { 'animate-out-notifications': this.state.open })
        }
      >
        <Notifications />
      </SidebarBase>
    );
  }
}

Sidebar.propTypes = {
  status: PropTypes.object.isRequired,
  updateStatus: PropTypes.func.isRequired
};
