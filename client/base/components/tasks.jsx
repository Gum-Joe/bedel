// Tasks component
import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import { Circle } from 'react-progressbar.js';
import { SidebarItem } from './navbar/sidebar';
import { SidebarHeader as Header } from './sidebar/header';

// Styles
import '../../sass/tasks.scss';

// Socket
const socket = io.connect('/');

// Opts
const options = {
  strokeWidth: 4,
  color: '#0D47A1',
  trailColor: '#616161'
};

// Component
export class Tasks extends Component {
  componentDidMount() {
    socket.on('task:new', (task) => {
      this.props.add(task);
    });
    socket.on('task:update', (task) => {
      this.props.update(task);
    });
  }
  render() {
    return (
      <div className="tasks">
        <Header header="Tasks" updateStatus={this.props.updateStatus} />
          {
            this.props.tasks.map((task) => {
              return (
                <SidebarItem appendClass="task" button>
                  <div>
                    <Circle
                      progress={task.percentage}
                      options={options}
                      text={`${task.percentage * 100}%`}
                      initialAnimate
                      containerClassName="task-progress-bar"
                    />
                    <p><h4>{task.title}</h4></p>
                    <p id="task-status">
                      <h5>{task.status || `${task.percentage * 100}%`}</h5>
                    </p>
                    <p id="task-app">
                      <h6>{task.app}</h6>
                    </p>
                  </div>
                </SidebarItem>
              );
            })
          }
        <SidebarItem appendClass="task task-spacer" button>
          <div></div>
        </SidebarItem>
      </div>
    );
  }
}

Tasks.propTypes = {
  add: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};
