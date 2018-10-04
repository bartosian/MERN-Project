import React, { Component, Fragment } from 'react';
import './Profile.css';
import Picture from './PictureBlock/PictureBlock';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import Friends from './Friends/Friends';
import Wall from './Wall/Wall';
import Header from '../Header/Header';


class Profile extends Component {

    state = {
      user: this.props.loggedInUser
    };


    render() {

        const{ user } = this.state;
        const { logout, getUser } = this.props;

        return (
            <Fragment>
                    <Header logout={ logout }/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <Picture user={ user }/>
                        </div>
                        <div className="col-12 col-md-8">
                            <PersonalInfo user={ user }/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Friends user={ user }/>
                        </div>
                        <div className="col-12 col-md-6">
                            <Wall user={ user }/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Profile;