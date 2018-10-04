import React, { Component } from 'react';
import AddPost from './AddPost/AddPost';
import Post from './Post/Post';
import './Wall.css';

class Wall extends Component {

    state = {
        user: this.props.user
    };


    render() {

        const { posts, username } = this.state.user;

        const postsList = posts.length !== 0 ? posts.length > 20 ? (
            posts.slice(0, 20).map((p, id) => (
                <Post key={ Math.random() + id } author={ username } date={ p.date } content={ p.content }/>
            ))
        ):(
            posts.map((p, id) => (
                <Post key={ Math.random() + id } author={ username } date={ p.date } content={ p.content }/>
            ))
        ): (
            <div className="empty-posts-wrapper">
                <i className="fa fa-files-o empty-posts" aria-hidden="true"></i>
            </div>
        );

        return (
            <div className="wall-wrapper">
                <h5 className="friends-header">Posts</h5>
                <div className="wall-posts">
                    <AddPost />
                </div>
                <div className="posts-board">
                    { postsList }
                </div>
            </div>
        );
    }
};

export default Wall;