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
        open: false,
        alreadyOpened: false
      }
    });
    setInterval(this.updateState.bind(this), 100);
  }
  updateState() {
    //console.log(this.props.status.sidebar.alreadyOpened);
    this.setState({
      open: this.props.status.sidebar.open,
      alreadyOpened: this.props.status.sidebar.alreadyOpened
    });
  }
  render() {
    return (
      <SidebarBase
        appendClass={
          classnames(
            'notifications-bar',
            { 'animate-in-sidebar': !this.state.open && this.state.alreadyOpened },
            { 'animate-out-sidebar': this.state.open }
          )
        }
      >
        <Notifications updateStatus={this.props.updateStatus} />
      </SidebarBase>
    );
  }
}

Sidebar.propTypes = {
  status: PropTypes.object.isRequired,
  updateStatus: PropTypes.func.isRequired
};
