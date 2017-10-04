import React, {Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../Home';
import About from '../About';
import {Nav} from './Nav';

export default class App extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <Nav/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route render={ function() {
                    return <h1> Not found! better luck next time </h1>
                }} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
};