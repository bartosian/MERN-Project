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
      post: this.props.editPost.content || "",
      editPostId: this.props.editPost._id || "",
      loading: false
    };

    inputChangedHandler = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            post: nextProps.editPost.content,
            editPostId: nextProps.editPost._id
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

    handleEditPost = () => {

        const {post} = this.state;
        const id = this.state.editPostId;
        const { changePosts } = this.props;

        this.setState({
            loading: true
        });

        this.service.editPost({ content: post, id })
            .then(response => {
                changePosts(response);

                this.setState({
                    loading: false,
                    post: "",
                    editPostId: ""
                });
            }).catch(err => console.log(err));

    };



    render() {

        let clicked = this.handleAddPost;
        let btnText = "Place new post";

        if(this.state.editPostId !== "") {
            clicked = this.handleEditPost;
            btnText = "Edit this post"
        }


        return (
            <Fragment>
                <Input
                    elementType="textarea"
                    elementConfig={{ placeholder: "Enter new post", name: "post" }}
                    value={ this.state.post }
                    changed={ (event) => this.inputChangedHandler(event) }
                />
                <Button btnType="primary" disabled={ !this.state.post || this.state.loading } clicked={ clicked }>{ btnText }</Button>
            </Fragment>
        );

    }}

export default AddPost;