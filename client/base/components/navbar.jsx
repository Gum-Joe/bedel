/**
 * Application container
 * @export <AppContainer />: Container that contains the running application (i.e. The bedel dashboard)
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Gravatar from 'react-gravatar';
import classnames from 'classnames';
import variables from '!!sass-variable-loader!../sass/colours.scss';

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      profileDropdownOpen: false
    }
  }
  openProfileDropdown() {
    // Opens or closes profile dropdown
    this.setState({
      profileDropdownOpen: !this.state.profileDropdownOpen
    })
  }
  render() {
    return (
      <div className="bedel-navbar">
        <ul>
          <li>
            <a><FontAwesome name="list-ul" /></a>
          </li>
          <li>
            <a><FontAwesome name="bell" /></a>
          </li>
          <li className={classnames("bedel-nav-dropdown", { "bedel-nav-dropdown-isopen": this.state.profileDropdownOpen })}>
            <a className="ui dropdown">
              <div className="text" onClick={this.openProfileDropdown.bind(this)}>
                <Gravatar email="kishansambhi@hotmail.co.uk" className="bedel-gravatar" /> Gum Joe
                <i className="dropdown icon"></i>
              </div>
              <div className={classnames("menu", { block: this.state.profileDropdownOpen })}>
                <div className="item">
                  <div className={`ui ${variables.accentString} inverted segment bedel-profile`}>
                    <Gravatar email="kishansambhi@hotmail.co.uk" size={100} className="bedel-profile-gravatar" />
                    <h3>Gum Joe</h3>
                    <h6>Bio</h6>
                    <Link to="/apps/profile">
                      <button id="bedel-profile-button" className="ui button">
                        Profile
                      </button>
                    </Link>
                    <a href="/signout">
                      <button className="ui button">
                        Sign Out
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
