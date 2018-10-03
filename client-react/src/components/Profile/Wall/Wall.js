import React, { Component } from 'react';
import AddPost from './AddPost/AddPost';
import Post from './Post/Post';
import './Wall.css';

class Wall extends Component {

    state = {
        posts: [
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'Hi everyone, I am new here!'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I like music and lot of albums'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I want to be a real professional'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'Hi everyone, I am new here!'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I like music and lot of albums'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I want to be a real professional'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'Hi everyone, I am new here!'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I like music and lot of albums'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I want to be a real professional'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'Hi everyone, I am new here!'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I like music and lot of albums'
            },
            {
                author: "Kiryl",
                date: new Date().toLocaleDateString(),
                content: 'I want to be a real professional'
            }
        ]
    };


    render() {
        return (
            <div className="wall-wrapper">
                <h5 className="friends-header">Posts</h5>
                <div className="wall-posts">
                    <AddPost />
                </div>
                <div className="posts-board">
                    {
                        this.state.posts.map((p, id) => (
                            <Post key={ p.author + id } {...p}/>
                        ))
                    }
                </div>
            </div>
        );
    }
};

export default Wall;