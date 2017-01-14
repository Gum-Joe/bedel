/**
 * Sidebar component
 * Container links to different parts of bedel
 * @export <Sidebar />: Sidebar for bedel
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

class Item extends Component {
  render() {
    return (
      <Link to={this.props.to} className={classnames("bedel-item", { active: this.props.active })}>
        <div className="bedel-inner-item">
          <FontAwesome name={this.props.icon} />
        </div>
        <p>{this.props.text}</p>
      </Link>
    )
  }
}

Item.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }
  animateSidebar() {
    if (!this.state.open) {
      $('.bedel-sidebar').addClass('sidebar-animate');
      $('.bedel-sidebar').removeClass('sidebar-animate-close');
      $('.body').addClass('body-animate');
      $('.body').removeClass('body-animate-close');
      $('.bedel-navbar').addClass('navbar-animate');
      $('.bedel-navbar').removeClass('navbar-animate-close');
    } else {
      $('.bedel-sidebar').addClass('sidebar-animate-close');
      $('.bedel-sidebar').removeClass('sidebar-animate');
      $('.body').addClass('body-animate-close');
      $('.body').removeClass('body-animate');
      $('.bedel-navbar').addClass('navbar-animate-close');
      $('.bedel-navbar').removeClass('navbar-animate');
    }
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    return (
      <div className="bedel-sidebar">
        <div className="bedel-item" id="hamburger-wrapper">
          <div className="bedel-inner-item" id="hamburger">
            <button onClick={this.animateSidebar.bind(this)}>
              <div></div>
              <div></div>
              <div id="last-hamburger"></div>
            </button>
          </div>
        </div>
        <Item icon="dashboard" text="Dashboard" to="/" />
        <Item icon="cube" text="Apps" to="/apps" />
        <Item icon="comments" text="Messages" to="/apps/messaging" />
        <Item icon="line-chart" text="Stats" to="/apps/dashboard/stats" />
        <Item icon="question" text="Help" to="/apps/help" />
        <Item icon="comment" text="Feedback" to="/apps/help/feedback" />
        <Item icon="cog" text="Settings" to="/apps/settings" />
      </div>
    );
  }
}
