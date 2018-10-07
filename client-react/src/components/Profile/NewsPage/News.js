import React, { Component } from 'react';
import SingleNews from './SingleNews/SingleNews';
import PostService from '../../../services/post-service';
import './News.css';


class  News extends  Component {

    constructor(props) {
        super(props);
        this.service = new PostService();
    }

    state = {
        news: []
    };

    componentDidMount() {
        this.service.getFriendsPosts()
            .then(response => {

                response = response.sort((p1, p2) => {
                    const date1 = new Date(p1.date);
                    const date2 = new Date(p2.date);

                    if(date1 > date2) {
                        return -1;
                    } else if(date1 < date2) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                this.setState({
                    news: response
                });

            }).catch(err => {
            console.log(err);
        });
    }

    addLike = (userId, postId) => {
        this.service.addLikeToPost(userId, postId)
            .then(response => {

                response = response.sort((p1, p2) => {
                    const date1 = new Date(p1.date);
                    const date2 = new Date(p2.date);

                    if(date1 > date2) {
                        return -1;
                    } else if(date1 < date2) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

               this.setState({
                   news: response
               })
            })
    };

    render() {

        const news = this.state.news.length ? (
            this.state.news.map((n, id) => (
                <SingleNews key={ n.username + id} {...n} getUser={ this.props.getUser } addLike={ this.addLike }/>
            ))
        ) : <p>No news</p>;


        return (
            <div className="container news-wrapper">
                { news }
            </div>
        )
    }

}

export  default News;