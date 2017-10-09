import React, {Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Nav} from './Nav';
import Explore from '../Explore';
import MyReviews from '../MyReviews';
import NotFound from '../NotFound';
import './style.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <Nav/>
            <Switch>
                <Route exact path="/" component={Explore}/>
                <Route path="/my-reviews" component={MyReviews}/>
                <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
};