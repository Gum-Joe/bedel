// JSX file for navbar
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Sidebar, SidebarItem } from './sidebar';
import { Hero } from './sidebar/hero';

export class Nav extends Component {
  render() {
    return (
      <Sidebar>
        <Hero />
        <SidebarItem><FontAwesome name="dashboard" /> Dashboard</SidebarItem>
      </Sidebar>
    );
  }
}
