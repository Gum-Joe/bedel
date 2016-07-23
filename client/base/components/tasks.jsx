// Tasks component
import React, { Component, PropTypes } from 'react';
import { Circle } from 'react-progressbar.js';
import { SidebarItem } from './navbar/sidebar';
import { SidebarHeader as Header } from './sidebar/header';

// Styles
import '../../sass/tasks.scss';

const options = {
  strokeWidth: 4,
  color: '#0D47A1',
  trailColor: '#616161'
};

// Component
export class Tasks extends Component {
  render() {
    return (
      <div>
        <Header header="Tasks" updateStatus={this.props.updateStatus} />
        <SidebarItem appendClass="task" normal>
          <div>
            <Circle
              progress={1}
              options={options}
              text="100%"
              initialAnimate
              containerClassName="task-progress-bar"
            />
            <p><h4>Running...</h4></p>
            <p id="task-status">
              <h5>1 mb / 100 mb</h5>
            </p>
            <p id="task-app">
              <h6>Updater</h6>
            </p>
          </div>
        </SidebarItem>
      </div>
    );
  }
}

Tasks.propTypes = {
  updateStatus: PropTypes.func.isRequired
};
