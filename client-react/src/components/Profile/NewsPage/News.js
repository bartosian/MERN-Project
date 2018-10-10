import React, { Component, Fragment } from 'react';
import SingleNews from './SingleNews/SingleNews';
import PostService from '../../../services/post-service';
import { Link } from 'react-router-dom';
import './News.css';


class  News extends  Component {

    constructor(props) {
        super(props);
        this.service = new PostService();
    }

    state = {
        news: [],
        showArticle: false,
        showName: null
    };

    componentDidMount() {
        this.service.getFriendsPosts()
            .then(response => {
                if(!Array.isArray(response)) return;

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

    selectArticle = (content, name) => {
        this.setState({
            showArticle: content,
            showName: name
        });
    };

    render() {

        const news = this.state.news.length ? (
            this.state.news.map((n, id) => (
                <SingleNews key={ n.username + id} {...n} getUser={ this.props.getUser } selectArticle={ this.selectArticle } addLike={ this.addLike }/>
            ))

        ) : (<div className="row no-wrapper">
                <div className="col-12 col-md-7 no-news">
                    <Link to="/profile/users" className="navLink"><i className="fa fa-users empty-friends" aria-hidden="true"></i></Link>
                    You don't have any news yet.
                </div>
            </div>) ;


        return (
            <Fragment>
                {
                    this.state.showArticle && (
                        <div className="col-12 col-md-7 picture-block news-block">
                            <h2 className="news-block-name">{ this.state.showName }</h2>
                            <div>{ this.state.showArticle }</div>
                            <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={ () => this.selectArticle(null)}></i>
                        </div>
                    )
                }
                <div className="container news-wrapper main-content-footer">
                    { news }
                </div>
            </Fragment>
        )
    }

}

export  default News;