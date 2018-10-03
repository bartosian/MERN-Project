import React from 'react';
import './Post.css';

const post = ({ author, date, content }) => {


    return (
       <div className="user-post">
           <div className="row user-data cred-data">
               <p className="user-post-name">
                   <i className="fa fa-user" aria-hidden="true"></i> { author }
               </p>
               <p className="user-post-date">
                   <i className="fa fa-clock-o" aria-hidden="true"></i> { date }
               </p>
           </div>
           <div className="row user-data">
               <p className="user-post-content">
                   { content }
               </p>
           </div>
       </div>
    );
};

export default post;