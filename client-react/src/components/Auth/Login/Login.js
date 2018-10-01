import React, { Component } from 'react';
import AuthService from '../../../services/auth-service';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };

        this.service = new AuthService();
    }

    handleFormSubmit = () => {

        const { username, password } = this.state;

        this.service.login(username, password)
            .then( response => {
                this.setState({
                    username: "",
                    password: ""
                });

                console.log(response);
                this.props.getUser(response);
                this.props.history.push('/profile');

            })
            .catch( error => {
                this.setState({
                    error: "Something went wrong!"
                });

                setTimeout(() => {
                    this.setState({
                        error: ""
                    });
                }, 2000);
            } )
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    render(){

        const error = this.state.error ? (
            <div className="alert">{ this.state.error }</div>
        ) : null;

        return(
            <p>Login</p>
        )
    }
}

export default Login;