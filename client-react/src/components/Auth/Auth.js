import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import './Auth.css';

const auth = (props) => (
    <div className="container auth-wrapper">
        <div className="row form-wrapper">
            <div className="col-12 d-none d-md-block col-md-5"><img className="main-bg" src="http://factorybuilderstores.com/wp-content/uploads/2016/02/SM-Graphic.png" alt="social"/></div>
            <div className="col-12 col-md-5 user-form">
                <Switch>
                    <Route exact path="/" render={ () => (
                        <Redirect to="/signup"/>
                    )} />
                    <Route path="/signup" component={ Signup }/>
                    <Route path="/login" component={ Login }/>
                </Switch>
            </div>
        </div>
    </div>
);

export default auth;