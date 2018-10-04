import React, { Component } from 'react';
import AddPost from './AddPost/AddPost';
import Post from './Post/Post';
import './Wall.css';

class Wall extends Component {

    state = {
        posts: this.props.user.posts
    };


    render() {

        const { posts } = this.state;

        const postsList = posts.length !== 0 ? posts.length > 20 ? (
            posts.slice(0, 20).map((p, id) => (
                <Post key={ Math.random() + id } author={ p.user.username } date={ p.date } content={ p.content }/>
            ))
        ):(
            posts.map((p, id) => (
                <Post key={ Math.random() + id } author={ p.user.username } date={ p.date } content={ p.content }/>
            ))
        ): (
            <i className="fa fa-users empty-friends" aria-hidden="true"></i>
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