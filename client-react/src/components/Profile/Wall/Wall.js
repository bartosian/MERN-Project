import React, { Component } from 'react';
import AddPost from './AddPost/AddPost';
import './Wall.css';

class Wall extends Component {

    state = {
        posts: []
    };


    render() {
        return (
            <div className="wall-wrapper">
                <h5 className="friends-header">Posts</h5>
                <div className="wall-posts">
                    <AddPost />
                </div>
            </div>
        );
    }
};

export default Wall;