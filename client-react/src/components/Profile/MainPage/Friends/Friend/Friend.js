import React from 'react';
import './Friend.css';
import noUser from '../../../../../assets/images/no-user.jpg';
import { withRouter } from 'react-router';

const friend = ({ name, url, id, history}) => {
    const imageUrl = url !== "" ? url : noUser;

    return (
        <div className="friend" onClick={ () => history.push(`/profile/chats/new${id}`)}>
            <div className="name-layer">{ name }</div>
            <img src={ imageUrl } alt="friend" className="friend-img"/>
        </div>
    );
};

export default withRouter(friend);