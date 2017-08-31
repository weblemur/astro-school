import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './Root';
import Home from './Home';
import Campuses from './Campuses';
import Students from './Students';
import NotFound from './NotFound';
import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';

class BaseRoutes extends Component {
  componentDidMount () {
    this.props.loadState();
  }

  render () {
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

const mapState = null;
const mapDispatch = dispatch => ({
  loadState: () => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }
});

export default connect(mapState, mapDispatch)(BaseRoutes);
