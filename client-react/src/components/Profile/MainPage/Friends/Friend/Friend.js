import React from 'react';
import './Friend.css';
import noUser from '../../../../../assets/images/no-user.jpg';

const friend = ({ name, url }) => {
    const imageUrl = url !== "" ? url : noUser;
    return (
        <div className="friend">
            <div className="name-layer">{ name }</div>
            <img src={ imageUrl } alt="friend" className="friend-img"/>
        </div>
    );
};

export default friend;