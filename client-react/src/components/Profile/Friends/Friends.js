import React from 'react';
import './Friends.css';
import Friend from './Friend/Friend';

const friends = ({user}) => {

    const { friends } = user;

    const friendsCopyList = friends.length ? friends.length > 25 ? (
        friends.slice(0, 25).map((f, id) => (
            <Friend key={ f.username + id } name={ f.username } url={ f.image ? f.image : "" }/>
        ))
    ):(
        friends.map((f, id) => (
            <Friend key={ f.username + id } name={ f.username } url={ f.image ? f.image : "" }/>
        ))
    ): (
        <i className="fa fa-users empty-friends" aria-hidden="true"></i>
    );

    const friendsClasses = ['friends-wrapper'];

    if(friends.length === 0) {
        friendsClasses.push('empty-list-center');
    }

    return (
        <div className="friends">
            <h5 className="friends-header">Friends <span>({ friends.length !== 0 ? friends.length : '0' })</span></h5>
            <div className={ friendsClasses.join(" ") }>
                { friendsCopyList }
            </div>
        </div>
    );
};

export default friends;