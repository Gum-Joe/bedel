// Page body
import React, { Component, PropTypes } from 'react';
import { Navigater } from './navbar';
// Css
import '../../sass/dashboard.scss';

export class PageBody extends Component {
  render() {
    return (
      <div className="page-body">
        <Navigater
          counter={this.props.counter}
          user={this.props.user}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          plus={this.props.plus}
          minus={this.props.minus}
        />
        {this.props.children}
      </div>
    );
  }
}

PageBody.propTypes = {
  counter: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  minus: PropTypes.func.isRequired,
  plus: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  updateStatus: PropTypes.func,
  user: PropTypes.object.isRequired
};
