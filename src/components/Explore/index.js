import React, {Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import apiConstants from '../../shared/api.constants.js';
import './style.css';

export default class Explore extends Component {
  constructor (props) {
    super();
    this.state = {
        data: "this is the current state"
    };
  };

  componentDidMount () {
      // http call for getViewers
      axios.get(apiConstants.HOST + '/api/getViewers')
        .then(res => {
          const data = JSON.stringify(res.data);
          this.setState({ data });
        });
  }

  render() {
    return (
      <div className='explore'>
        <div className="explore-header">
          <img src={logo} className="explore-logo" alt="logo" />
          <h2>Explorer</h2>
        </div>
        <p className="explore-intro">
          State: {this.state.data}.
        </p>
      </div>
    );
  }
};