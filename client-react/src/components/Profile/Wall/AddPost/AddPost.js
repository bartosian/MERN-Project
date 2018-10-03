import React, { Component, Fragment } from 'react';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import './AddPost.css';

class AddPost extends Component {

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

    render() {


        return (
            <Fragment>
                <Input
                    elementType="textarea"
                    elementConfig={{ placeholder: "Enter new post", name: "post" }}
                    value={ this.state.post }
                    changed={ (event) => this.inputChangedHandler(event) }
                />
                <Button btnType="primary" disabled={ !this.state.post }>Place new post</Button>
            </Fragment>
        );

    }}

export default AddPost;