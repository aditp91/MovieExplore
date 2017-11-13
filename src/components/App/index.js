import React, {Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Nav} from './Nav';
import Explore from '../Explore';
import MyReviews from '../MyReviews';
import NotFound from '../NotFound';
import './style.css';


const LoginConst = (props) => {

  const validateSubmit = (e) => {
    e.preventDefault();

    console.log(e.input);

    props.changeCurrentUser(123123123);
  }

  return (
    <div className="login">
      <form onSubmit={validateSubmit}>
        <div className="form-group">
          <input type="username" className="form-control" id="username-id" placeholder="Username"/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="password-id" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default class App extends Component {
  constructor (props) {
    super();
    this.state = {
        currentUserId: "default",
    };

    this.changeCurrentUser.bind(this);
  };

  changeCurrentUser(userId) {
    console.log(userId);
    this.setState({ currentUserId: userId });

  }

  render() {
    const { currentUserId } = this.state;

    return (
      <BrowserRouter>
        <div className="container">
            <Nav/>
            <Switch>
                <Route exact path="/" component={Explore} userId="currentUserId" />
                <Route path="/my-reviews" component={MyReviews} userId="currentUserId"/>
                <Route path="/login" render={()=><LoginConst changeCurrentUser={this.changeCurrentUser.bind(this)} />} />
                <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
};