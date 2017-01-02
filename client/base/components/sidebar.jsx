/**
 * Sidebar component
 * Container links to different parts of bedel
 * @export <Sidebar />: Sidebar for bedel
 */
import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

class Item extends Component {
  render() {
    return (
      <div className={classnames("bedel-item", { active: this.props.active })}>
        <FontAwesome name={this.props.icon} />
      </div>
    )
  }
}

Item.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired
}

export class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }
  render() {
    return (
      <div className="bedel-sidebar">
        <div className="bedel-item" id="hamburger">
          <button>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        <Item icon="dashboard" />
        <Item icon="comments" />
        <Item icon="line-chart" />
        <Item icon="question" />
        <Item icon="comment" />
        <Item icon="cog" />
      </div>
    );
  }
}
