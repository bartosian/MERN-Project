import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';

const auth = (props) => (
    <Switch>
        <Route exact path="/" render={ () => (
             <Redirect to="/signup"/>
            )} />
        <Route path="/signup" component={ Signup }/>
        <Route path="/login" component={ Login }/>
    </Switch>
);

export default auth;