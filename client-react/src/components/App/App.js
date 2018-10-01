import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <Switch>
            <Route path='/profile' component={ Profile }/>
            <Route path='/' component={ Auth } />
        </Switch>
    );
  }
}

export default App;
