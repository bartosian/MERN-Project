import React, { Component } from 'react';
import AuthService from '../../../services/auth-service';
import './Signup.css';

class Signup extends Component {
    constructor(props){
        super(props);
        this.service = new AuthService();
    }

    state = {
        signupForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your name"
                },
                value: ""
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your email"
                },
                value: ""
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: "password",
                    placeholder: "Enter your password"
                },
                value: ""
            }
        },
        loading: false
    };


    handleFormSubmit = (event) => {
        event.preventDefault();

        const { history } = this.props;

        this.setState({
            loading: true
        });

        const userData = {};

        for(let key in this.state.signupForm ) {
            userData[key] = this.state.signupForm[key].value;
        }

        this.service.signup(...userData)
            .then( response => {
                // this.props.getUser(response);
                history.push('/profile');
            })
            .catch( error => {
                console.log("Something went wrong!");
            });
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
            <p>Signup</p>
        )
    }
}

export default Signup;