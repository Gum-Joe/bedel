// Hamburgers
import React, { Component, PropTypes } from 'react';

/**
 * Props:
 * @prop type {String} Hamburger type
 * @prop click {Function} What to do when clicked
*/
export const Hamburger = React.createClass({
  // Prop types
  propTypes: {
    type: PropTypes.string.isRequired,
    click: PropTypes.func
  },

  getDefaultProps() {
    return {
      type: "spin",
      onclick: () => {
        return;
      }
    };
  },

  render() {
    return (
      <button className={`hamburger hamburger--${this.props.type}`} type="button" onClick={this.props.click}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    );
  }
});
