import React from 'react';
import './User.css';
import noUser from '../../../../assets/images/no-user.jpg';

const user = ({user, userFriends, selectPhoto, addFriend, deleteFriend, history}) => {
    const {image, username, status, country, occupation, _id, friends } = user;
    let controls = null;
    let userHasFriend = false;

    for(let fr of userFriends) {
        if(fr._id === _id) {
            userHasFriend = true;
        }
    }

    if(userHasFriend) {
        controls = (
            <div className="friend-controls">
                <div className="add-friend friend-delete" onClick={() => deleteFriend(_id)}>
                    <span>Delete friend</span>
                    <i className="fa fa-minus-circle" aria-hidden="true"></i>
                </div>
                <div className="send-mess" onClick={ () => history.push(`/profile/chats/new${user._id}`)}>
                    <span>Send message</span>
                    <i className="fa fa-comment comment-icon" aria-hidden="true"></i>
                </div>
            </div>
        )
    } else {
        controls = (
            <div className="friend-controls">
                <div className="add-friend" onClick={() => addFriend(_id)}>
                    <span>Add friend</span>
                    <i className="fa fa-plus-square" aria-hidden="true"></i>
                </div>
            </div>
        )
    }

    return (
        <div className="row friend-block">
            <div className="col-12 col-md-7 friend-main">
                <div className="friend-image">
                    <div className="hover-info">
                        <i className="fa fa-search-plus" aria-hidden="true" onClick={ () => selectPhoto(image) }></i>
                    </div>
                    <img src={image || noUser} alt="friend"/>
                </div>
                <div className="friend-info">
                    <div className="friend-name-block">
                        <p className="friend-name"><i className="fa fa-user-circle detail-icon text-primary"></i>{ username || "Not specified" }</p>
                        <p className="friend-country"><i className="fa fa-globe detail-icon text-primary"></i>{ country || "Not specified" }</p>
                        <p className="friends-quantity-user"><i className="fa fa-users detail-icon text-primary"></i>{ friends.length }</p>
                    </div>
                    <div className="friend-name-block">
                        <p className="friend-status"><i className="fa fa-heart detail-icon text-primary"></i>{ status || "Not specified" }</p>
                        <p className="friend-occupation"><i className="fa fa-briefcase detail-icon text-primary"></i>{ occupation || "Not specified" }</p>
                    </div>
                </div>
                { controls }
            </div>
        </div>
    )
};

export default user;