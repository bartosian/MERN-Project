import React from 'react';
import './MessageItem.css';
import moment from "moment/moment";

const messageItem = ({content, user, date, userId, image}) => {
    const classes = ["message-text"];
    const imageClasses = ["name-message"];

    if(String(user) === String(userId)) {
        classes.push("text-right-mess");
    } else {
        imageClasses.push("name-message-block");
    }

    let newDate =  new Date(date);
    newDate = newDate.setDate(newDate.getDate() + 1);
    newDate = moment(newDate).format('YYYY-MM-DD hh:mm');

    return (
        <div className="message-row">
            <div className={ classes.join(" ") }>
                { content }
                <div className="date-message">{ newDate }</div>
                <div className={imageClasses.join(" ")}>
                    <img src={image} alt="user"/>
                </div>
            </div>
        </div>
    );
};

export default messageItem;