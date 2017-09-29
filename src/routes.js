import React from 'react';
import { Router, Route } from 'react-router';

import About from './components/About';
import App from './components/App';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
  </Router>
);

export default Routes;