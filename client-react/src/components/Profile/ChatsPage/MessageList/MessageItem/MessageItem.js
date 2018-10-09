import React from 'react';
import './MessageItem.css';

const messageItem = ({content, user, date, userId}) => {
    const classes = ["message-text"];

    if(String(user) === String(userId)) {
        classes.push("text-right-mess");
    }

    return (
        <div className="message-row">
            <div className={ classes.join(" ") }>
                dgdgdgdgdgdggdgdgdg dgdgdgdgdgdggdgdgdg dgdgdgdgdgdggdgdgdg dgdgdgdgdgdggdgdgdg dgdgdgdgdgdggdgdgdg
            </div>
        </div>
    );
};

export default messageItem;
