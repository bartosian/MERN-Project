import React, { Component } from 'react';
import './Profile.css';
import Picture from './PictureBlock/PictureBlock';

class Profile extends Component {

    state = {
      user: this.props.loggedInUser
    };

    render() {
        return (
            <div className="container p-5">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Picture user={ this.state.user }/>
                    </div>
                    <div className="col-12 col-md-8">Personal info</div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">Friends options</div>
                    <div className="col-12 col-md-8">Board options</div>
                </div>
            </div>
        );
    }
}

export default Profile;