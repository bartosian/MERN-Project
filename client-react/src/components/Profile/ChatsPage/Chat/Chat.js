import React from 'react';
import './Chat.css';
import moment from 'moment';
import noUser from '../../../../assets/images/no-user.jpg';

const chat = ({ _id, messages, speakerFirst, speakerSecond, user, created_at, redirectMessages }) => {

    const image = String(speakerFirst._id) === String(user._id) ? speakerSecond.image : speakerFirst.image;
    const name = !String(speakerFirst._id) === String(user._id) ? speakerFirst.username : speakerSecond.username;
    let image2 = null;
    let lastMessage =  messages.length > 0 ? (messages.sort((m1, m2) => {

        const date1 = new Date(m1.date);
        const date2 = new Date(m2.date);

        if(date1 > date2) {
            return -1;
        } else if(date1 < date2) {
            return 1;
        } else {
            return 0;
        }
    })[0]) : "";

    let lastMessageContent = null;
    if(lastMessage.content) {
        lastMessageContent = lastMessage.content.includes("http") ? "Image file" : lastMessage.content;
        image2 = (String(lastMessage.user) === String(speakerFirst._id)) ? speakerFirst.image : speakerSecond.image;
        lastMessageContent = !lastMessageContent.length > 70 ? lastMessageContent : lastMessageContent.slice(0, 70);
    } else {
        lastMessageContent = "No messages. Start the first chat!";
    }


    const classesPhoto = ["sec-user-photo"];
    if(!messages.length > 0) {
        classesPhoto.push("sec-user-photo--none");
    }

    let newDate =  new Date(created_at);
    newDate = newDate.setDate(newDate.getDate() + 1);
    newDate = moment(newDate).format('YYYY-MM-DD');


    return (
        <div className="row chat-wrapper">
            <div className="col-10 col-md-7 chat-main" onClick={ () => redirectMessages(_id) }>
                <div className="chat-main-wrapper"></div>
                <div className="chat-image">
                    <img className="chat-image-src" src={ image ? image : noUser} alt="chat"/>
                </div>
                <div className="chat-lastmes">
                    <p className="chat-name">{name}</p>
                    <div className={ classesPhoto.join(" ") }>
                        <img src={ image2 || noUser } alt="user-second"/>
                    </div>
                    { lastMessageContent }
                </div>
                <div className="chat-controls">
                    <p className="chat-date"><i className="fa fa-clock-o clock-icon" aria-hidden="true"></i> <span>{newDate}</span></p>
                    <div className="new-massages">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export  default chat;