// Error page
import React from 'react';
import pack from '../../package.json';
import '../sass/error.scss';

// Error page
export const ErrorPage = React.createClass({
  getInitalState() {
    const state = {};
    state.version = pack.version;
    const major = parseInt(pack.version.split('.')[0], 10);
    const middle = parseInt(pack.version.split('.')[1], 10);
    if (major > 0) {
      state.type = 'full';
    } else if (middle > 1 ) {
      state.type = 'beta';
    } else {
      state.type = 'alpha';
    }
    this.setState(state);
  },
  render() {
    return (
      <div className="error-page">
        <h1>404:</h1>
        <h1>We couldn't find that page. Check the url is correct.</h1>
        <div style={{marginTop: '50px'}}>
          <h1>Note: This is an <strong>ALPHA</strong> copy.</h1>
          <h1>Not all features may be available.</h1>
          <h1>Version {pack.version}</h1>
        </div>
      </div>
    );
  }
});
