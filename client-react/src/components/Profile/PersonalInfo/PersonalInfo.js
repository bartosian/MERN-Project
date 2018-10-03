import React, { Component } from 'react';
import Name from '../../../components/Profile/PersonalInfo/NameSection/NameSection';
import Details from '../../../components/Profile/PersonalInfo/PersonalDetails/PersonalDetails';
import Interests from '../../../components/Profile/PersonalInfo/Interests/Interests';
import './PersonalInfo.css';

class PersonalInfo extends Component {
    state = {
        interests: [
            'web-development',
            'cars',
            'music',
            'friends',
            'fights',
            'fishing',
            'drinks',
            'money',
            'technology',
            'girls'
        ]
    };


    render() {

        const { interests } = this.state;

        return (
            <div className="container">
                <div className="col-12 user-name">
                    <Name />
                </div>
                <div className="user-info">
                    <div className="row summary">
                        <div className="row personal-details">
                            <Details />
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