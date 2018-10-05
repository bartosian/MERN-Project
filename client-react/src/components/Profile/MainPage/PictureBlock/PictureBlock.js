import React, { Component, Fragment } from 'react';
import AuthService from '../../../../services/auth-service';
import Button from '../../../UI/Button/Button';
import './PictureBlock.css';

class PictureBlock extends Component {

    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    state = {
        file: this.props.user.image || null,
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
                });

                const newUser = {...this.props.user};
                newUser.image = data.image;

                this.props.getUser(newUser);
            });
    };

    selectPhoto = () => {
        this.input.click();
    };

    deleteFile = () => {
        this.setState({
            file: null,
            showImage: false
        });

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
                                <i className="fa fa-hand-o-down finger finger-upload" aria-hidden="true"></i>
                            </Fragment>
                        )
                    }
                    {
                        typeof this.state.file === 'string' && (
                            <img className="profile-photo" src={ this.state.file} alt="user"/>
                        )
                    }

                    <input className="photo-loader" ref={ (node) => this.input = node } onChange={(e)=>this.handleChange(e)} name="picture"  type="file"/>
                </div>
                {
                    typeof this.state.file === 'string' ?  (
                        <Button className="btn-photo" btnType="primary" clicked={ this.deleteFile }>Choose another photo</Button>
                    ) : (
                        <Button className="btn-photo" btnType="primary" disabled={ !this.state.file || this.state.showImage } clicked={ this.handleSubmit }>Change photo</Button>
                    )
                }
            </div>
        );
    }

};

export default PictureBlock;