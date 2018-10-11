import React, { Component, Fragment } from 'react';
import User from './User/User';
import FriendService from '../../../services/friend-service';
import './Users.css';

class Users extends Component {

    constructor(props) {
        super(props);
        this.friendService = new FriendService();
    }

    state = {
        users: this.props.users,
        shownImageYrl: null
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            users: nextProps.users
        });

    }


    selectPhoto = (url) => {
        this.setState({
            shownImageYrl: url
        });
    };

    addNewFriend = (friendId) => {
        const id = friendId;
        const user = {...this.props.user};

        this.friendService.addFriend({id})
            .then(response => {
                user.friends = response;

                this.props.getUser(user);
            }).catch(err => {
                console.log(err);
        });
    };

    deleteFriend = (friendId) => {

        const id = friendId;
        const user = {...this.props.user};

        this.friendService.deleteFriend({id})
            .then(response => {
                user.friends = response;

                this.props.getUser(user);
            }).catch(err => {
            console.log(err);
        });
    };


    render() {
        const friends = [ ...this.props.user.friends ];
        const { history } = this.props;

        return (
            <Fragment>
                {
                    this.state.shownImageYrl && (
                        <div className="col-12 col-md-7 picture-block">
                            <img className="detail-photo" src={this.state.shownImageYrl} alt="profile"/>
                            <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={ () => this.selectPhoto(null)}></i>
                        </div>
                    )
                }
                <div className="container users-wrapper main-content-footer">
                    {
                        this.state.users.length > 0 ? this.state.users.map((user, idx) => (
                            <User key={ user.username + idx} user={ user } userFriends={ friends } selectPhoto={ this.selectPhoto } addFriend={ this.addNewFriend } deleteFriend={ this.deleteFriend } history={ history }/>
                        )) : (<div className="row no-wrapper">
                            <div className="col-12 col-md-7 no-news">You don't have any friends yet.</div>
                        </div>)
                    }
                </div>
            </Fragment>
        );
    }
}

export default Users;