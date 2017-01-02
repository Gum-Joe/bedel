/**
 * Application container
 * @export <AppContainer />: Container that contains the running application (i.e. The bedel dashboard)
 */
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Gravatar from 'react-gravatar';

export class AppContainer extends Component {
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
          <li>
            <a><Gravatar email="kishansambhi@hotmail.co.uk" className="bedel-gravatar" /> Gum Joe</a>
          </li>
        </ul>
      </div>
    );
  }
}
