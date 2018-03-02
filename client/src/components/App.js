import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Dashboard from './Dashboard';
import Header from './Header';
import Landing from './Landing';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Switch>
              <Route component={Landing} exact path="/" />
              <Route component={Dashboard} exact path="/surveys" />
              <Route component={SurveyNew} exact path="/surveys/new" />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default connect(null, actions)(App);
