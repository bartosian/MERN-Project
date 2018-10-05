import React, { Component } from 'react';
import Name from './NameSection/NameSection';
import Details from './PersonalDetails/PersonalDetails';
import Interests from './Interests/Interests';
import './PersonalInfo.css';
import moment from 'moment';

class PersonalInfo extends Component {
    state = {
        user: this.props.user
    };


    render() {

        let { interests, dob, status, username, contacts } = this.state.user;


        if(dob) {
            dob = moment(dob).format('YYYY-MM-DD')
        }



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