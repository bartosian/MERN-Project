import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import AuthService from '../../services/auth-service';
import ProtectedRoute from '../Auth/protected-route';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = { loggedInUser: null };
        this.service = new AuthService();
    }

    fetchUser = () => {
        if( this.state.loggedInUser === null ){
            this.service.loggedin()
                .then(response =>{
                    this.setState({
                        loggedInUser:  response
                    })
                })
                .catch( err =>{
                    this.setState({
                        loggedInUser:  false
                    })
                })
        }
    };

    componentWillMount() {
        this.fetchUser();
    };

    getTheUser= (userObj) => {
        this.setState({
            loggedInUser: userObj
        })
    };

    logoutUser = (history) =>{
        this.service.logout()
            .then(() => {
                this.setState({ loggedInUser: null });
                history.push('/');
            })
    };

      render() {
        return (
            <Switch>
                <ProtectedRoute user={ this.state.loggedInUser } path='/profile' component={ Profile }/>
                <Route path='/' render = {() => {
                    return this.state.loggedInUser ? <Redirect to="/profile" /> : <Auth getTheUser={ this.getTheUser }/>}} />
            </Switch>
        );
      }
}

export default App;
