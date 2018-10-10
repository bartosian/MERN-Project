import React from 'react';
import './Friends.css';
import Friend from './Friend/Friend';
import { Link } from 'react-router-dom';

const friends = ({user}) => {

    const { friends } = user;

    const friendsCopyList = friends.length ? friends.length > 25 ? (
        friends.slice(0, 25).map((f, id) => (
            <Friend key={ f.username + id } name={ f.username } url={ f.image ? f.image : "" } id={ f._id }/>
        ))
    ):(
        friends.map((f, id) => (
            <Friend key={ f.username + id } name={ f.username } url={ f.image ? f.image : "" } id={ f._id }/>
        ))
    ): (
        <Link to="/profile/users" className="navLink"><i className="fa fa-users empty-friends" aria-hidden="true"></i></Link>
    );

    const friendsClasses = ['friends-wrapper'];

    if(friends.length === 0) {
        friendsClasses.push('empty-list-center');
    }

    return (
        <div className="friends">
            <h5 className="friends-header"><strong>Friends <span>({ friends.length !== 0 ? friends.length : '0' })</span></strong><Link className="navLink" to="/profile/users"><i className="fa fa-users detail-icon text-primary"></i></Link></h5>
            <div className={ friendsClasses.join(" ") }>
                { friendsCopyList }
            </div>
        </div>
    );
};

export default friends;