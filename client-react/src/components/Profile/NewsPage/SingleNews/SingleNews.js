import React from 'react';
import './Singlenews.css';
import moment from 'moment';

const singleNews = ({image, username, content, date}) => {
    let newDate = new Date(date);
    newDate = newDate.setDate(newDate.getDate() + 1);
    newDate = moment(newDate).format('YYYY-MM-DD hh:mm');




    return (
        <div className="row news-wrapper">
            <div className="col-12 col-md-7 news-main">
                <div className="news-info">
                    <div className="news-user">
                        <p>{ username }</p>
                        <p>{ newDate }</p>
                    </div>
                    <div className="btn-like"></div>
                </div>
                <div className="news-content"></div>
            </div>
        </div>
    );
};

export default singleNews;