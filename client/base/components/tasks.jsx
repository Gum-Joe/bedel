// Tasks component
import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import variables from '!!sass-variable-loader!../../sass/util/vars.scss'; // eslint-disable-line
import { Circle } from 'react-progressbar.js';
import { SidebarItem } from './navbar/sidebar';
import { SidebarHeader as Header } from './sidebar/header';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

// Styles
import '../../sass/tasks.scss';

// Socket
const socket = io.connect('/');

// Opts
const options = {
  strokeWidth: 4,
  color: variables.accent,
  trailColor: '#616161'
};

// Component
export class Tasks extends Component {
  constructor() {
    super();
    this.intialState = {
      open: false,
      taskToRemove: {}
    };
    this.state = this.intialState;
  }
  componentDidMount() {
    socket.on('task:new', (task) => {
      this.props.add(task);
      this.props.plus('unseenTasks');
    });
    socket.on('task:update', (task) => {
      this.props.update(task);
    });
  }
  handleModalClose () { this.setState(this.intialState); }
  handleModalYes () {
    this.setState(Object.assign(this.state, { open: false }));
    if (this.state.taskToRemove.hasCancelEvent) {
      this.props.cancel(this.state.taskToRemove);
      socket.emit('task:cancel', this.state.taskToRemove);
      socket.on('task:end', function (task) {
        if (task.id === this.state.taskToRemove.id) {
          this.props.remove(this.state.taskToRemove);
          this.setState(this.intialState);
        }
      }.bind(this));
    } else {
      this.props.remove(this.state.taskToRemove);
      this.setState(this.intialState);
    }
  }
  render() {
    return (
      <div className="tasks">
        <Header header="Tasks" status={this.props.status} updateStatus={this.props.updateStatus} />
          {
            this.props.tasks.length > 0 ?
            this.props.tasks.map((task) => {
              const randID = Math.round(Math.random() * 100000);
              return (
                <SidebarItem
                  href={task.hasOwnProperty('link') ? task.link : null}
                  appendClass={`task ${task.hasOwnProperty('link') ? 'task-link' : null}`}
                  noLink={!task.hasOwnProperty('link')}
                  normal={!task.react && task.hasOwnProperty('react')}
                >
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
                    <p
                      onMouseEnter={
                        () => {
                          $(`.${randID}`).html(
                            `<h6><button>&times</button></h6>`
                          );
                          $(`.${randID} h6 button`).click(() => {
                            this.setState({
                              open: true,
                              taskToRemove: Object.assign({}, task)
                            });
                          });
                        }
                      }
                      onMouseLeave={() => {
                        $(`.${randID}`).html(`<h6>${task.app}</h6>`);
                      }}
                      id='task-app'
                      className={randID}
                    >
                      <h6>{task.app}</h6>
                    </p>
                  </div>
                </SidebarItem>
              );
            }) : <div className="container no-notifications-tasks"><h4>No tasks are currently running.</h4></div>
          }
        <SidebarItem appendClass="task task-spacer" noLink>
          <div></div>
        </SidebarItem>
        {/* Modal */}
        {
          this.state.open ? (
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog
                onClose={this.handleClose}
                className="tasks-cancel-modal"
              >
                <h3 id="task-modal-header">Do you really want to cancel this task?</h3>
                <button
                  id="yes"
                  onClick={this.handleModalYes.bind(this)}
                  className="btn btn-success"
                  autoFocus
                >Yes</button>
                <button
                  onClick={
                    () => {
                      this.setState(this.intialState);
                    }
                  }
                  className="btn btn-danger"
                >No</button>
              </ModalDialog>
            </ModalContainer>
          ) : <div></div>
        }
      </div>
    );
  }
}

Tasks.propTypes = {
  add: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};
