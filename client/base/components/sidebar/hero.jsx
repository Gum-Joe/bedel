// Hero image (sidebar)
import React, { Component } from 'react';
import { SidebarItemHero } from '../navbar/sidebar';
import bedelb from '../../../assets/img/Bedel_Logo_2.png';

// Export
export class Hero extends Component {
  render() {
    return (
      <SidebarItemHero>
        <img src={bedelb} className="sidebar-hero" />
        <h3>Bedel</h3>
      </SidebarItemHero>
    );
  }
}
