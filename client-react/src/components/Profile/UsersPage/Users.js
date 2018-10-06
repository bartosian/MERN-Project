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
        users: [],
        shownImageYrl: null
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

    selectPhoto = (url) => {
        this.setState({
            shownImageYrl: url
        });
    };


    render() {
        const currentUserId = this.props.user._id;

        return (
            <div className="container users-wrapper">
                {
                    this.state.shownImageYrl && (
                        <div className="col-12 col-md-7 picture-block">
                            <img className="detail-photo" src={this.state.shownImageYrl} alt="profile"/>
                            <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={ () => this.selectPhoto(null)}></i>
                        </div>
                    )
                }
                {
                    this.state.users.map((user, idx) => (
                        <User key={ user.username + idx} user={ user } id={ currentUserId } selectPhoto={ this.selectPhoto }/>
                    ))
                }
            </div>
        );
    }
}

export default Users;