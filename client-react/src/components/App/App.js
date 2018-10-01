import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/' component={ Auth } />
        </Switch>
    );
  }
}

export default App;
