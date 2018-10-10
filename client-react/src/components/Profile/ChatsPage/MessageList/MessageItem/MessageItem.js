import React from 'react';
import './MessageItem.css';
import moment from "moment/moment";
import noUser from '../../../../../assets/images/no-user.jpg';

const messageItem = ({content, user, date, userId, image, selectImage}) => {
    const classes = ["message-text"];
    const imageClasses = ["name-message"];

    if(String(user) === String(userId)) {
        classes.push("text-right-mess");
    } else {
        imageClasses.push("name-message-block");
    }

    const messageContent = content.includes("http") ? (
        <div className="image-open" onClick={ () => selectImage(content) }>
            <i className="fa fa-play-circle"></i>
        </div>
        ) : content;

    let newDate =  new Date(date);
    newDate = newDate.setDate(newDate.getDate() + 1);
    newDate = moment(newDate).format('YYYY-MM-DD hh:mm');

    return (
        <div className="message-row">
            <div className={ classes.join(" ") }>
                { messageContent }
                <div className="date-message">{ newDate }</div>
                <div className={imageClasses.join(" ")}>
                    <img src={image || noUser} alt="user"/>
                </div>
            </div>
        </div>
    );
};

export default messageItem;
