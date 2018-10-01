import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import AuthService from '../../services/auth-service';
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
                <Route path='/profile' component={ Profile }/>
                <Route path='/' component={ Auth } />
            </Switch>
        );
      }
}

export default App;
