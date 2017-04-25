import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import App from './App';

/**
 * Define routes
 * 
 * @class Routes
 * @extends {Component}
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={App} />
      </Switch>
    );
  }
}

export default Routes;
