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
      currentUserId: "",
      currentUsername: "",
      currentRole: "unauthorized"
    };

    this.changeCurrentUser.bind(this);
  };

  changeCurrentUser(currentUserId, currentUsername, currentRole) {
    this.setState({ currentUserId, currentUsername, currentRole});
  }

  render(props) {
    const { currentUserId, currentUsername, currentRole} = this.state;

    return (
      <BrowserRouter>
        <div className="container">
            <Nav userId={currentUserId} username={currentUsername} role={currentRole}/>
            <Switch>
                <Route exact path="/" component={(props)=><Explore userId={currentUserId} role={currentRole} {...props} />} />
                <Route path="/my-reviews" component={MyReviews} userId={currentUserId}/>
                <Route path="/login" component={(props)=><Login changeCurrentUser={this.changeCurrentUser.bind(this)} {...props} />} />
                <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
};