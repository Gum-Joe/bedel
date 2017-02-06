/**
  * App loader
  * Gets app from server and renders
  * @export AppLoader {Class} App loader
 */
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router'
import ajax from '@fdaciuk/ajax';

// 404 class
class Err404 extends Component {
  render() {
    return (
      <div className="err404">
        <h1>Oops!</h1>
        <h2>We couldn't find the app '{this.props.app}'</h2>
        <div id="q-mark">
          <p>?</p>
        </div>
        <Link to={`/apps/store/app/${this.props.app}`}>
          <button className="ui green button">Find in the store</button>
        </Link>
        <button className="ui red button" onClick={() => browserHistory.goBack()}>Go Back >></button>
      </div>
    );
  }
}

export default class AppLoader extends Component {
  constructor(){
  	super();
    this.intialState = (
      <div className="ui segment" style={{margin: 0, height: "100%"}}>
        <div className="ui active dimmer">
          <div className="ui text massive loader">Loading</div>
        </div>
      </div>
    )
  	this.state = {
      rendered: this.intialState
    };
  }

  componentDidMount() {
    this.setState({
      rendered: this.intialState
    });
    // Get app
    let currentProps = Object.assign({}, this.props.app);
    setInterval(() => {
      if (currentProps.app !== this.props.app) {
        ajax().get(`/api/apps/${this.props.app}`).always((res, xhr) => {
          if (xhr.status === 404) {
            // Display 404
            this.setState({
              rendered: <Err404 app={this.props.app} />
            });
          } else {
            this.setState({
              rendered: <Err404 app={this.props.app} />
            });
          }
        });
        let currentProps = Object.assign({}, this.props.app);
      }
    }, 500);
  }

  render() {
    return this.state.rendered;
  }
}

AppLoader.propTypes = {
  app: PropTypes.string.isRequired
}
