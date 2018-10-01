import React, { Component } from 'react';
import AuthService from '../../../services/auth-service';
import './Signup.css';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: ''
        };

        this.service = new AuthService();
    }

    handleFormSubmit = () => {
        const { username, password, course, campus } = this.state;
        const { history } = this.props;


        this.service.signup(username, password, campus, course)
            .then( response => {
                this.setState({
                    username: "",
                    password: "",
                    course: "",
                    campus: ""
                });

                this.props.getUser(response);
                history.push('/profile');

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
            <p>Signup</p>
        )
    }
}

export default Signup;