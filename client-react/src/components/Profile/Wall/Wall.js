import React, { Component } from 'react';
import AddPost from './AddPost/AddPost';
import Post from './Post/Post';
import './Wall.css';

class Wall extends Component {

    state = {
        user: this.props.user,
        editPost: false
    };

    changePosts = (newPosts) => {
        const copyUser = { ...this.state.user };
        copyUser.posts = newPosts;

        this.setState({
            user: copyUser
        });
    };

    selectPostEdit = (id) => {
        const { posts } = this.state.user;
        const selectedPost = posts.find(post => post._id === id);

        this.setState({
            editPost: selectedPost
        });
    };

    deleteEditPost = () => {
        this.setState({
            editPost: false
        });
    };


    render() {

        let { posts, username } = this.state.user;


        if(posts.length !== 0) {
            posts = posts.sort((p1, p2) => {
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
        }


        const postsList = posts.length !== 0 ? posts.length > 20 ? (
            posts.slice(0, 20).map((p, id) => (
                <Post key={ Math.random() + id } author={ username } date={ p.date } content={ p.content } id={ p._id } changePosts={ this.changePosts } editSelect={ this.selectPostEdit }/>
            ))
        ):(
            posts.map((p, id) => (
                <Post key={ Math.random() + id } author={ username } date={ p.date } content={ p.content } id={ p._id } changePosts={ this.changePosts } editSelect={ this.selectPostEdit }/>
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
                    <AddPost changePosts={ this.changePosts } editPost={ this.state.editPost } deleteEditMode={ this.deleteEditPost }/>
                </div>
                <div className="posts-board">
                    { postsList }
                </div>
            </div>
        );
    }
};

export default Wall;