import React, { Component } from 'react';
import AuthService from '../../../services/auth-service';
import Input from './../../UI/Input/Input';
import Button from './../../UI/Button/Button';
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

    inputChangedHandler = (e, inputIdentifier) => {
        const newSignupForm = { ...this.state.signupForm };
        let updatedControl = { ...newSignupForm[inputIdentifier] };
        updatedControl.value = e.target.value;
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
                <h4>SignUp form</h4>
                { form }
            </div>
        );

    }
}

export default Signup;