import React, { Component } from 'react';
import AuthService from '../../../services/auth-service';
import Input from './../../UI/Input/Input';
import Button from './../../UI/Button/Button';
import { Link } from 'react-router-dom';
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
                value: "",
                validation : {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your email"
                },
                value: "",
                validation : {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: "password",
                    placeholder: "Enter your password"
                },
                value: "",
                validation : {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        isFormValid: false,
        error: false
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


        this.service.signup(userData)
            .then( response => {
                this.props.getTheUser(response);
                history.push('/profile');
            })
            .catch( error => {
                this.setState({
                    error: true
                });

                setTimeout(() => {
                    this.setState({
                        error: false
                    });
                }, 2000);
            });
    };

    looksLikeMail(str) {
        var lastAtPos = str.lastIndexOf('@');
        var lastDotPos = str.lastIndexOf('.');
        return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') === -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
    };

    checkValidity(value, rules) {
        let valid = true;

        if(rules.required) {
            valid =  value.trim() !== '' && valid;
        }

        if(rules.minLength) {
            valid = value.length >= rules.minLength && valid;
        }

        if(rules.email) {
            valid = this.looksLikeMail(value) && valid;
            console.log(this.looksLikeMail(value));
        }

        return valid;
    };


    inputChangedHandler = (e, inputIdentifier) => {
        const newSignupForm = { ...this.state.signupForm };
        let updatedControl = { ...newSignupForm[inputIdentifier] };
        updatedControl.value = e.target.value;
        updatedControl.valid = this.checkValidity(updatedControl.value, updatedControl.validation);
        updatedControl.touched = true;
        newSignupForm[inputIdentifier] = updatedControl;

        let formIsValid = true;
        for(let inputIdentifier in newSignupForm) {
            formIsValid = newSignupForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            signupForm: newSignupForm,
            isFormValid: formIsValid
        });
    };


    render() {

        const formElementsArr = [];

        for (let key in this.state.signupForm) {
            formElementsArr.push({
                id: key,
                config: this.state.signupForm[key]
            });
        }

        let form = ( <form onSubmit={ this.handleFormSubmit } action="#">
            {
                formElementsArr.map( el => (
                    <Input
                        key={ el.id }
                        label={ el.id }
                        invalid={ !el.config.valid }
                        elementType={ el.config.elementType }
                        elementConfig={ el.config.elementConfig}
                        value={ el.config.value }
                        touched={ el.config.touched }
                        changed={ (event) => this.inputChangedHandler(event, el.id) }
                    />
                ))
            }
            <Button btnType="primary" disabled={ !this.state.isFormValid }>Submit</Button>
        </form>);

        let error = (
            <p className="alert alert-danger">There is error with your credentials!</p>
        );

        return (
            <div>
                <h4 className="form-header"><span>SignUp</span> form</h4>
                {this.state.error && error }
                { form }
                <p>Do you have already account?    <Link className="login-link" to="/login">Log in</Link></p>
            </div>
        );

    }
}

export default Signup;