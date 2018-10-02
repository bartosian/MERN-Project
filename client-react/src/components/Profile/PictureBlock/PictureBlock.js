import React, { Component, Fragment } from 'react';
import AuthService from '../../../services/auth-service';
import Button from '../../UI/Button/Button';
import './PictureBlock.css';

class PictureBlock extends Component {

    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    state = {
        file: null,
        showImage: false
    };

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        })
    };

    handleSubmit = () => {
        this.authService.addPicture(this.state.file)
            .then( data => {
                this.setState({
                    file: data.image,
                    showImage: true
                })
            });
    };

    selectPhoto = () => {
        this.input.click();
    };

    render() {
        return (
            <div className="picture-user">
                <div className="choose-picture">
                    { !this.state.file ? (
                        <Fragment>
                            <i className="fa fa-hand-o-down finger" aria-hidden="true"></i>
                            <p className="upload-hint">Choose photo</p>
                            <i className="fa fa-camera-retro camera" onClick={ this.selectPhoto }></i>
                        </Fragment>
                        ) : (
                            <Fragment>
                                <p className="upload-hint hint--block">Loaded</p>
                                <i className="fa fa-file-image-o image-icon" aria-hidden="true"></i>
                            </Fragment>
                        )
                    }

                    <input className="photo-loader" ref={ (node) => this.input = node } onChange={(e)=>this.handleChange(e)} name="picture"  type="file"/>
                </div>
                    <Button className="btn-photo" btnType="primary" disabled={ this.state.file }>Change photo</Button>
            </div>
        );
    }

};

export default PictureBlock;