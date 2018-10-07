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
                this.setState({
                    news: response
                });

            }).catch(err => {
            console.log(err);
        });
    }

    render() {

        const news = this.state.news.length ? (
            this.state.news.map((n, id) => (
                <SingleNews key={ n.username + id} {...n}/>
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