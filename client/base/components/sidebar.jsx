// Sidebar Component for notifications
import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import { Sidebar as SidebarBase } from './navbar/sidebar';
import { Notifications } from '../containers/Notifications';
import { Tasks } from '../containers/Tasks';
import { Tabs, Tab, TabsHeader as Header, TabsBody as Body } from './tabs';
// Export
export class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  componentDidMount() {
    this.props.updateStatus({
      sidebar: {
        open: false,
        alreadyOpened: false,
        tab: 0
      }
    });
    setInterval(this.updateState.bind(this), 100);
  }
  setTab(tab) {
    this.props.updateStatus({
      sidebar: Object.assign(this.props.status.sidebar, { tab })
    });
  }
  updateState() {
    this.setState({
      open: this.props.status.sidebar.open,
      alreadyOpened: this.props.status.sidebar.alreadyOpened,
      tab: this.props.status.sidebar.tab
    });
  }
  render() {
    return (
      <SidebarBase
        appendClass={
          classnames(
            'notifications-bar',
            { 'animate-in-sidebar': !this.state.open && this.state.alreadyOpened },
            { 'animate-out-sidebar': this.state.open }
          )
        }
      >
        <Tabs currentTab={this.state.tab} defaultTab={0}>
          <Header count={2}>
            <Tab currentTab={this.state.tab} setTab={this.setTab.bind(this)} id={0}>
              <FontAwesome name="bell" />
            </Tab>
            <Tab currentTab={this.state.tab} setTab={this.setTab.bind(this)} id={1}>
              <FontAwesome name="tasks" />
            </Tab>
          </Header>
          <Body currentTab={this.state.tab} id={0}>
            <Notifications status={this.props.status} updateStatus={this.props.updateStatus} />
          </Body>
          <Body currentTab={this.state.tab} id={1}>
            <Tasks status={this.props.status} updateStatus={this.props.updateStatus} />
          </Body>
        </Tabs>
      </SidebarBase>
    );
  }
}

Sidebar.propTypes = {
  status: PropTypes.object.isRequired,
  updateStatus: PropTypes.func.isRequired
};
