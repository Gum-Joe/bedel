/**
 * Navbar component
 * Container links to notifications, tasks and user profile
 * @export <Navbar />: Navbar for bedel
 */
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div className="ui top blue inverted attached menu">
        <div
          className="item hamburger"
          onClick={() => {
            if (!this.state.open) {
              $('.body').animate({ marginLeft: '200px', width: 'calc(100% - 200px)'}, 500);
              this.setState({ open: true });
            } else {
              $('.body').animate({ marginLeft: '50px', width: 'calc(100% - 50px)'}, 500);
              this.setState({ open: false });
            }
          }}
        >
          <FontAwesome name="bars" size='2x' />
        </div>
      </div>
    );
  }
}
