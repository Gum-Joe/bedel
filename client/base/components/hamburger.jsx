// Hamburgers
import React, { PropTypes } from 'react';

/**
 * Props:
 * @prop type {String} Hamburger type
 * @prop click {Function} What to do when clicked
*/
export const Hamburger = React.createClass({
  // Prop types
  propTypes: {
    type: PropTypes.string.isRequired,
    click: PropTypes.func,
    className: PropTypes.string
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
      <button className={`hamburger hamburger--${this.props.type} ${this.props.className}`} type="button" onClick={this.props.click}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    );
  }
});
