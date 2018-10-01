import React, { Component } from 'react';
import AuthService from '../../../services/auth-service';
import Input from './../../UI/Input/Input';
import Button from './../../UI/Button/Button';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.service = new AuthService();
    }

    state = {
        loginForm: {
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

        for(let key in this.state.loginForm ) {
            userData[key] = this.state.loginForm[key].value;
        }

        this.service.login(userData)
            .then( response => {
                // this.props.getUser(response);
                history.push('/profile');
            })
            .catch( error => {
                console.log("Something went wrong!");
            });
    };

    inputChangedHandler = (e, inputIdentifier) => {
        const newLoginForm = { ...this.state.loginForm };
        let updatedControl = { ...newLoginForm[inputIdentifier] };
        updatedControl.value = e.target.value;
        newLoginForm[inputIdentifier] = updatedControl;

        this.setState({
            loginForm: newLoginForm
        });
    };


    render() {

        const formElementsArr = [];

        for (let key in this.state.loginForm) {
            formElementsArr.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let form = ( <form onSubmit={ this.handleFormSubmit } action="#">
            {
                formElementsArr.map( el => (
                    <Input
                        key={ el.id }
                        label={ el.id }
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
                <h4 className="form-header">Log form</h4>
                { form }
                <p>Don't you have account?   <Link to="/signup">Sign up</Link></p>
            </div>
        );

    }
}

export default Login;