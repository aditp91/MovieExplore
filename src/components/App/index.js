import React, {Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Nav} from './Nav';
import Login from '../Login';
import Explore from '../Explore';
import MyReviews from '../MyReviews';
import NotFound from '../NotFound';
import './style.css';

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

  render(props) {
    const { currentUserId } = this.state;

    return (
      <BrowserRouter>
        <div className="container">
            <Nav/>
            <Switch>
                <Route exact path="/" component={Explore} userId={currentUserId} />
                <Route path="/my-reviews" component={MyReviews} userId={currentUserId}/>
                <Route path="/login" component={(props)=><Login changeCurrentUser={this.changeCurrentUser.bind(this)} {...props} />} />
                <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
};