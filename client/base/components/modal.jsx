// Modal
import React, { Component, PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

// Component
export class Modal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }
  handleClick () { this.setState({ isOpen: true }); }
  handleClose () { this.setState({ isOpen: false }); }
  render() {
    return (
      <div onClick={this.handleClick}>
      {
        this.state.isOpen &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              {this.props.chidren}
            </ModalDialog>
          </ModalContainer>
      }
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.object.isRequired
};
