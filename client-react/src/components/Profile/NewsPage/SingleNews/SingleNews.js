import React from 'react';
import './Singlenews.css';
import moment from 'moment';

const singleNews = ({image, username, content, date, likes, user, _id, addLike}) => {
    let newDate = new Date(date);
    newDate = newDate.setDate(newDate.getDate() + 1);
    newDate = moment(newDate).format('YYYY-MM-DD hh:mm');

    let newContent = content.length > 200 ? content.slice(0, 150) + '...' : content;
    const userId = user;
    const postId = _id;

    return (
        <div className="row news-wrapper">
            <div className="col-10 col-md-8 news-main">
                <div className="news-image">
                    <img src={ image ? image : "https://yt3.ggpht.com/a-/AJLlDp02y_3SsMYN_uiJd9sGjNL0fFeCjsQhSW90=s900-mo-c-c0xffffffff-rj-k-no" } alt=""/>
                </div>
                <div className="news-info">
                    <div className="news-user">
                        <p className="news-user--name">{ username }</p>
                        <p className="news-user--date">{ newDate }</p>
                    </div>
                    <div className="btn-like">
                        <div className="like-quantity">{ likes ? likes : 0 }</div>
                        <i className="fa fa-thumbs-up like" aria-hidden="true" onClick={() => addLike(userId, postId)}></i>
                        <div className="send-mess">
                            <span>Send message</span>
                            <i className="fa fa-comment comment-icon" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="news-content">
                    { newContent }
                </div>
            </div>
        </div>
    );
};

export default singleNews;