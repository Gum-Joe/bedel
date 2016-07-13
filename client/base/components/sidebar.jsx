// Sidebar Component for notifications
import React, { Component } from 'react';
import { Sidebar as SidebarBase } from './navbar/sidebar';
import { Notifications } from '../containers/Notifications';
// Export
export class Sidebar extends Component {
  render() {
    return (
      <SidebarBase appendClass="notifications-bar">
        <Notifications />
      </SidebarBase>
    );
  }
}
