import React, { Component, Fragment } from 'react';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import PostService from '../../../../services/post-service';
import './AddPost.css';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.service = new PostService();
    }

    state = {
      post: "",
      loading: false
    };

    inputChangedHandler = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    handleAddPost = () => {

        const {post} = this.state;
        const { changePosts } = this.props;

        this.setState({
            loading: true
        });

        this.service.addPost({ content: post })
            .then(response => {
                changePosts(response);

                this.setState({
                    loading: false,
                    post: ""
                });
            }).catch(err => console.log(err));

    };



    render() {


        return (
            <Fragment>
                <Input
                    elementType="textarea"
                    elementConfig={{ placeholder: "Enter new post", name: "post" }}
                    value={ this.state.post }
                    changed={ (event) => this.inputChangedHandler(event) }
                />
                <Button btnType="primary" disabled={ !this.state.post || this.state.loading } clicked={ this.handleAddPost }>Place new post</Button>
            </Fragment>
        );

    }}

export default AddPost;