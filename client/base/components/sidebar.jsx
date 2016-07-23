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
        alreadyOpened: false
      }
    });
    setInterval(this.updateState.bind(this), 100);
  }
  updateState() {
    //console.log(this.props.status.sidebar.alreadyOpened);
    this.setState({
      open: this.props.status.sidebar.open,
      alreadyOpened: this.props.status.sidebar.alreadyOpened
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
        <Tabs defaultTab={0}>
          <Header count={2}>
            <Tab id={0}>
              <FontAwesome name="bell" />
            </Tab>
            <Tab id={1}>
              <FontAwesome name="tasks" />
            </Tab>
          </Header>
          <Body id={0}>
            <Notifications updateStatus={this.props.updateStatus} />
          </Body>
          <Body id={1}>
            <Tasks updateStatus={this.props.updateStatus} />
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
