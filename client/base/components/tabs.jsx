// JSX for tabs
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// Sass
import '../../sass/tabs.scss';

// Current tab
// Should be in component's state
let current; // eslint-disable-line

// Export
export class Tabs extends Component {
  componentDidMount() {
    if (!isNaN(this.props.defaultTab)) {
      current = this.props.defaultTab;
    }
  }
  render() {
    return (
      <div className="tab-wrap">{this.props.children}</div>
    );
  }
}

export class Tab extends Component {
  render() {
    return (
      <li>
        <button
          className={classnames({ 'is-active-tab': this.props.currentTab === this.props.id })}
          onClick={() => { this.props.setTab(this.props.id); }}
        >
          {this.props.children}
        </button>
      </li>
    );
  }
}

export class TabsHeader extends Component {
  render() {
    return (
      <div className="tabs-header">
        <ul style={{ li: { width: `${100 / this.props.count}%` } }}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

export class TabsBody extends Component {
  constructor() {
    super();
    this.state = {
      current: 0
    };
    setInterval(this.updateState.bind(this), 100);
  }
  updateState() {
    // Update the state
    if (this.props.currentTab !== this.state.current) {
      this.setState({
        current: this.props.currentTab
      });
    }
  }
  render() {
    if (this.state.current === this.props.id) {
      return (
        <div className="tab-wrap">
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }

  }
}

Tabs.propTypes = {
  children: PropTypes.object,
  defaultTab: PropTypes.number,
  currentTab: PropTypes.number
};

Tab.propTypes = {
  children: PropTypes.object,
  id: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
  currentTab: PropTypes.number
};

TabsHeader.propTypes = {
  children: PropTypes.object,
  count: PropTypes.number.isRequired
};

TabsBody.propTypes = {
  children: PropTypes.object,
  id: PropTypes.number.isRequired,
  currentTab: PropTypes.number
};
