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
      // currentUserId: "unauthorized",
      currentUserId: 123,
      currentUsername: ""
    };

    this.changeCurrentUser.bind(this);
  };

  changeCurrentUser(currentUserId, currentUsername) {
    this.setState({ currentUserId, currentUsername });
  }

  render(props) {
    const { currentUserId, currentUsername } = this.state;

    return (
      <BrowserRouter>
        <div className="container">
            <Nav userId={currentUserId} username={currentUsername}/>
            <Switch>
                <Route exact path="/" component={(props)=><Explore userId={currentUserId} {...props} />} />
                <Route path="/my-reviews" component={MyReviews} userId={currentUserId}/>
                <Route path="/login" component={(props)=><Login changeCurrentUser={this.changeCurrentUser.bind(this)} {...props} />} />
                <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
};