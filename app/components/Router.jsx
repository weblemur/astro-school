import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import Campuses from './Campuses';
import Students from './Students';
import NotFound from './NotFound';

export default class RoutesWrapper extends Component {
  render() {
    return (
      <Router>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={Campuses} />
            <Route exact path="/students" component={Students} />
            <Route component={NotFound} />
          </Switch>
        </Root>
      </Router>
    );
  }
}
