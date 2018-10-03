import React from 'react';
import './Friend.css';

const friend = ({ name, url }) => {

    return (
        <div className="friend">
            <div className="name-layer">{ name }</div>
            <img src={ url } alt="friend" className="friend-img"/>
        </div>
    );
};

export default friend;