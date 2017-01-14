/**
 * Application container
 * @export <AppContainer />: Container that contains the running application (i.e. The bedel dashboard)
 */
import React, { Component } from 'react';
import Navbar from './navbar'

export class AppContainer extends Component {
  render() {
    return (
      <Navbar />
    );
  }
}
