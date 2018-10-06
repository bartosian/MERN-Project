import React from 'react';
import './User.css';

const user = ({user}) => {
    const {image, username, status, country, occupation } = user;
    return (
        <div className="row friend-block">
            <div className="col-12 col-md-7 friend-main">
                <div className="friend-image">
                    <div className="hover-info">
                        <i className="fa fa-search-plus" aria-hidden="true"></i>
                    </div>
                    <img src={image || "https://yt3.ggpht.com/a-/AJLlDp02y_3SsMYN_uiJd9sGjNL0fFeCjsQhSW90=s900-mo-c-c0xffffffff-rj-k-no"} alt="friend"/>
                </div>
                <div className="friend-info">
                    <div className="friend-name-block">
                        <p className="friend-name"><i className="fa fa-user-circle detail-icon text-primary"></i>{ username || "Not specified" }</p>
                        <p><i className="fa fa-globe detail-icon text-primary"></i>{ country || "Not specified" }</p>
                    </div>
                    <div className="friend-name-block">
                        <p className="friend-status"><i className="fa fa-heart detail-icon text-primary"></i>{ status || "Not specified" }</p>
                        <p><i className="fa fa-briefcase detail-icon text-primary"></i>{ occupation || "Not specified" }</p>
                    </div>
                </div>
                <div className="friend-controls"></div>
            </div>
        </div>
    )
};

export default user;