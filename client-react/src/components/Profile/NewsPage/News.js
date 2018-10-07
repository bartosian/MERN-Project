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

    render() {
        return (
            <div className="container news-wrapper">

            </div>
        )
    }

}

export  default News;