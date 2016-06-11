// Page body
import React, { Component } from 'react';
import { Navigater } from './navbar';
// Css
import '../sass/dashboard.scss';

export class PageBody extends Component {
  render() {
    return (
      <div className="page-body">
        <Navigater></Navigater>
        {this.props.children}
      </div>
    );
  }
}
