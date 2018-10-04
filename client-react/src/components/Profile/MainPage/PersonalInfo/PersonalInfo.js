import React, { Component } from 'react';
import Name from './NameSection/NameSection';
import Details from './PersonalDetails/PersonalDetails';
import Interests from './Interests/Interests';
import './PersonalInfo.css';

class PersonalInfo extends Component {
    state = {
        user: this.props.user
    };


    render() {

        const { interests, dob, status, username, contacts } = this.state.user;

        return (
            <div className="container">
                <div className="col-12 user-name">
                    <Name username={ username }/>
                </div>
                <div className="user-info">
                    <div className="row summary">
                        <div className="row personal-details">
                            <Details dob={ dob } status={ status } contacts={ contacts }/>
                        </div>
                    </div>
                </div>
                <div className="col-12 user-interests">
                    <div className="row interests">
                        <Interests interests={ interests }/>
                    </div>
                </div>
            </div>

        );
    }
}

export default PersonalInfo;