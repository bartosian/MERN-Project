import React, { Component } from 'react';
import PostService from '../../../../../services/post-service';
import './Post.css';

class Post extends Component {

    constructor(props) {
        super(props);
        this.service = new PostService();
    }


    deletePost = (postId) => {
        const id = postId;
        const { changePosts } = this.props;

        this.service.deletePost({id})
            .then(response => {
                changePosts(response);
            }).catch(err => console.log(err));
    };


    render() {
        const { author, date, content, id, editSelect } = this.props;
        const newDate = new Date(date).toLocaleDateString();

        return (
            <div className="user-post">
                <div className="row user-data cred-data">
                    <p className="user-post-name">
                        <i className="fa fa-user" aria-hidden="true"></i> { author }
                    </p>
                    <p className="user-post-date">
                        <i className="fa fa-clock-o" aria-hidden="true"></i> { newDate }
                        <i className="fa fa-cog text-warning warn" aria-hidden="true" onClick={() => editSelect(id)}></i>
                        <i className="fa fa-trash text-danger danger" aria-hidden="true" onClick={() => this.deletePost(id)}></i>
                    </p>
                </div>
                <div className="row user-data">
                    <p className="user-post-content">
                        { content }
                    </p>
                </div>
            </div>
        );
    }
};

export default Post;