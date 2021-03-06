import React from 'react';
import './Singlenews.css';
import moment from 'moment';
import { withRouter } from 'react-router';
import noUser from '../../../../assets/images/no-user.jpg';

const singleNews = ({image, username, content, date, likes, user, _id, addLike, selectArticle, history }) => {
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
                    <img src={ image ? image : noUser } alt=""/>
                </div>
                <div className="news-info">
                    <div className="news-user">
                        <p className="news-user--name">{ username }</p>
                        <p className="news-user--date">{ newDate }</p>
                    </div>
                    <div className="btn-like">
                        <div className="like-quantity">{ likes ? likes : 0 }</div>
                        <i className="fa fa-thumbs-up like" aria-hidden="true" onClick={() => addLike(userId, postId)}></i>
                        <div className="send-mess" onClick={ () => history.push(`/profile/chats/new${user}`)}>
                            <span>Send message</span>
                            <i className="fa fa-comment comment-icon" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="news-content">
                    <div className="content-search">
                        <i className="fa fa-search-plus" aria-hidden="true" onClick={ () => selectArticle(content, username) }></i>
                    </div>
                    { newContent }
                </div>
            </div>
        </div>
    );
};

export default withRouter(singleNews);