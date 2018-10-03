import React, { Component } from 'react';
import './Profile.css';
import Picture from './PictureBlock/PictureBlock';
import PersonalInfo from './PersonalInfo/PersonalInfo';


class Profile extends Component {

    state = {
      user: this.props.loggedInUser
    };

    render() {
        const{ username } = this.state.user;

        return (
            <div className="container p-5">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Picture user={ this.state.user }/>
                    </div>
                    <div className="col-12 col-md-8">
                        <PersonalInfo username={ username }/>
                    </div>
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