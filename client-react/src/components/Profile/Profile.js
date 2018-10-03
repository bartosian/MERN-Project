import React, { Component } from 'react';
import './Profile.css';
import Picture from './PictureBlock/PictureBlock';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import Friends from './Friends/Friends';
import Wall from './Wall/Wall';


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
                    <div className="col-12 col-md-6">
                        <Friends />
                    </div>
                    <div className="col-12 col-md-6">
                        <Wall />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;