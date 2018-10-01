import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import './Auth.css';

const auth = (props) => (
    <div className="col-12 col-md-5 user-form">
        <Switch>
            <Route exact path="/" render={ () => (
                <Redirect to="/signup"/>
            )} />
            <Route path="/signup" component={ Signup }/>
            <Route path="/login" component={ Login }/>
        </Switch>
    </div>
);

export default auth;