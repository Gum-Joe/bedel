// Sidebar Component for notifications
import React, { createClass } from 'react';
import classnames from 'classnames';
import { Sidebar as SidebarBase } from './navbar/sidebar';
import { Notifications } from '../containers/Notifications';
// Export
export const Sidebar = createClass({
  getInitialState() {
    return {
      isOpen: false
    };
  },
  render() {
    return (
      <SidebarBase appendClass={classnames('notifications-bar', { 'animate-out-notifications': this.state.isOpen })}>
        <Notifications />
      </SidebarBase>
    );
  }
});
