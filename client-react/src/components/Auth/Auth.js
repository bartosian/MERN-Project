import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import './Auth.css';
import bg from '../../assets/images/bg2-main.png';
import bg2 from '../../assets/images/main-bg3.gif';

const auth = (props) => {
        const { getTheUser } = props;

        return (
                <div className="container auth-wrapper">
                    <div className="col-12 col-md-10 form-wrapper">
                        <div className="col-12 d-none d-md-block col-md-7 img-wrapper-main">
                            <h1 className="main-logo">InTouch</h1>
                            <img className="main-bg" src={bg} alt="social"/>
                            <img className="main-bg-gif" src={bg2} alt="social-gif"/>
                        </div>
                        <div className="col-12 col-md-5 user-form">
                            <h1 className="main-logo d-md-none">InTouch</h1>
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
};

export default auth;