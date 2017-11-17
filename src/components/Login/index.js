import React, {Component } from 'react';
import axios from 'axios';

import apiConstants from '../../shared/api.constants.js';

export default class Login extends Component {
  constructor (props) {
    super();
    this.state = {
        username: "",
        password: "",
        role: ""
    };

    this.validateSubmit.bind(this);
  };

  handleUserInput (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateSubmit (e) {
    e.preventDefault();

    const {username, password} = this.state;
    
    axios.get(apiConstants.HOST + '/api/authenticate/'+username+'/'+password)
    .then(res => {
      const user = res.data[0] ? res.data[0] : null;

      if (user) {
        this.setState({ username, password, role: user.Role });
        this.props.changeCurrentUser(user.ID, user.Username, user.Role);
        this.props.history.push('/');
      } else {
        alert("Try Again");
      }
    });
  }

  render() {
    const {username, password} = this.state;

    return (
      <div className="login">
        <form onSubmit={this.validateSubmit.bind(this)}>
          <div className="form-group">
            <input type="username" className="form-control" name="username" placeholder="Username" onChange={(e) => this.handleUserInput(e)}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => this.handleUserInput(e)}/>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!username || !password}>Sign In</button>
        </form>
      </div>
    );
  }
};