import React, {Component } from 'react';

import logo from './logo.svg';
import './style.css';

export default class Home extends Component {
  constructor (props) {
    super();
    this.state = {
        text: "this is the current state {text}"
    };
  };

  componentDidMount () {
      this.setState({
        text: "changed text"
      });

      // http call for getViewers
  }

  render() {
    return (
      <div className='App'>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          State: {this.state.text}.
        </p>
      </div>
    );
  }
};