import React from 'react';
import './Chat.css';

const chat = ({ _id, messages, speakerFirst, speakerSecond }) => {


    return (
        <div className="row">
            <div className="col-10 col-md-7">
                { speakerFirst.username }
            </div>
        </div>
    );
};

export  default chat;