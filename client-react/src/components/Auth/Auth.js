import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import './Auth.css';

const auth = (props) => {
        const { getTheUser } = props;

        return (
                <div className="container auth-wrapper">
                    <div className="col-12 col-md-10 form-wrapper">
                        <div className="col-12 d-none d-md-block col-md-7"><img className="main-bg" src="http://www.broutinwebpublishing.com/wp-content/uploads/2016/04/social-media-local-1024x723.png" alt="social"/></div>
                        <div className="col-12 col-md-5 user-form">
                            <Switch>
                                <Route  exact path="/" render={ () => (
                                    <Redirect to="/signup"/>
                                )} />
                                <Route path="/signup" render= { (props) => <Signup {...props} getTheUser={ getTheUser }/>}/>
                                <Route path="/login" render= { (props) => <Login {...props} getTheUser={ getTheUser }/>}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            );
}

export default auth;