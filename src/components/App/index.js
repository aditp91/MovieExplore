import React, {Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Nav} from './Nav';
import Home from '../Home';
import About from '../About';
import NotFound from '../NotFound';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <Nav/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route component={NotFound} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
};