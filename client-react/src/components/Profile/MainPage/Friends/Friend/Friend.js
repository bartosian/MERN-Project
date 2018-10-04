import React from 'react';
import './Friend.css';

const friend = ({ name, url }) => {
    const imageUrl = url !== "" ? url : "https://yt3.ggpht.com/a-/AJLlDp02y_3SsMYN_uiJd9sGjNL0fFeCjsQhSW90=s900-mo-c-c0xffffffff-rj-k-no";
    return (
        <div className="friend">
            <div className="name-layer">{ name }</div>
            <img src={ imageUrl } alt="friend" className="friend-img"/>
        </div>
    );
};

export default friend;