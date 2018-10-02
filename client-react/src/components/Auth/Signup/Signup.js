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
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your email"
                },
                value: "",
                validation : {
                    required: true
                },
                valid: false
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
                valid: false
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


        this.service.signup(userData)
            .then( response => {
                this.props.getTheUser(response);
                history.push('/profile');
            })
            .catch( error => {
                console.log("Something went wrong!");
            });
    };

    checkValidity(value, rules) {
        let valid = true;

        if(rules.required) {
            valid =  value.trim() !== '' && valid;
        }

        if(rules.minLength) {
            valid = value.length >= rules.minLength && valid;
        }

        return valid;
    };

    inputChangedHandler = (e, inputIdentifier) => {
        const newSignupForm = { ...this.state.signupForm };
        let updatedControl = { ...newSignupForm[inputIdentifier] };
        updatedControl.value = e.target.value;
        updatedControl.valid = this.checkValidity(updatedControl.value, updatedControl.validation);
        newSignupForm[inputIdentifier] = updatedControl;

        this.setState({
            signupForm: newSignupForm
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
                        changed={ (event) => this.inputChangedHandler(event, el.id) }
                    />
                ))
            }
            <Button btnType="Success">Submit</Button>
        </form>);

        return (
            <div>
                <h4 className="form-header">SignUp form</h4>
                { form }
                <p>Do you have already account?    <Link to="/login">Log in</Link></p>
            </div>
        );

    }
}

export default Signup;