import React, { Component } from 'react';
import './PictureBlock.css';

class PictureBlock extends Component {

    render() {
        return (
            <div className="picture-user">
                <div className="choose-picture">
                    <p className="upload-hint">Choose photo</p>
                    <i className="fa fa-camera-retro camera"></i>
                    <input className="photo-loader" name="picture"  type="file"/>
                </div>
                button

            </div>
        );
    }

};

export default PictureBlock;