// Entry file for react
import React from 'react';
import ReactDOM from 'react-dom';

const Test = React.createClass({
  render: () => {
    return <h1>Hi</h1>;
  }
});

ReactDOM.render(<Test/>, document.getElementById('main'));
