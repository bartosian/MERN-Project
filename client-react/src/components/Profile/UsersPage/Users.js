import React, { Component } from 'react';
import User from './User/User';
import UsersService from '../../../services/users-service';
import './Users.css';

class Users extends Component {

    constructor(props) {
        super(props);
        this.service = new UsersService();
    }

    state = {
        users: []
    };

    componentDidMount() {
        this.service.getUsers()
            .then(response => {
                this.setState({
                    users: response
                });
                console.log(response);
            }).catch(err => {
                console.log(err);
        });
    }


    render() {
        return (
            <div className="container">
                {
                    this.state.users.map((user, idx) => (
                        <User key={ user.username + idx} user={ user }/>
                    ))
                }
            </div>
        );
    }
}

export default Users;