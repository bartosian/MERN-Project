import React, { Component } from 'react';
import User from './User/User';
import './Users.css';

class Users extends Component {


    render() {
        return (
            <div className="container">
                <User />
            </div>
        );
    }
}

export default Users;