import React, { Component, Fragment } from 'react';
import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';
import PostService from '../../../../../services/post-service';
import './AddPost.css';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.service = new PostService();
    }

    state = {
      post: this.props.editPost.content ? this.props.editPost.content : "",
      editPostId: this.props.editPost._id ? this.props.editPost._id : "",
      loading: false
    };

    inputChangedHandler = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.editPost) {
            this.setState({
                post: nextProps.editPost.content,
                editPostId: nextProps.editPost._id
            });
        }

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
        const { changePosts, deleteEditMode } = this.props;

        this.setState({
            loading: true
        });

        this.service.editPost({ content: post, id })
            .then(response => {

                changePosts(response);
                deleteEditMode();
                this.setState({
                    post: "",
                    editPostId: "",
                    loading: false,
                });




            }).catch(err => console.log(err));


    };

    cancelEditing = () => {
        const {  deleteEditMode } = this.props;
          this.setState({
              post: "",
              editPostId: "",
          });
        deleteEditMode();
    };



    render() {

        let clicked = this.handleAddPost;
        let btnText = "Place new post";

        if(this.state.editPostId) {
            clicked = this.handleEditPost;
            btnText = "Edit this post"
        }


        return (
            <Fragment>
                <Input
                    editMode={ !!this.state.editPostId }
                    elementType="textarea"
                    elementConfig={{ placeholder: "Enter new post", name: "post" }}
                    value={ this.state.post }
                    changed={ (event) => this.inputChangedHandler(event) }
                />
                <Button btnType="primary" disabled={ !this.state.post || this.state.loading } clicked={ clicked }>{ btnText }</Button>
                {
                    this.state.editPostId !== '' && <Button btnType="danger" disabled={ !this.state.post || this.state.loading } clicked={ this.cancelEditing }>Cancel editing</Button>
                }

            </Fragment>
        );

    }}

export default AddPost;