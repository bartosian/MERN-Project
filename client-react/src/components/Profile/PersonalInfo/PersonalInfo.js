import React, { Component } from 'react';
import Name from '../../../components/Profile/PersonalInfo/NameSection/NameSection';
import Details from '../../../components/Profile/PersonalInfo/PersonalDetails/PersonalDetails';
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
                        {
                            this.state.interests.map((i, id) => (
                                <div key={i + id} className="interest">{i}</div>
                            ))
                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default PersonalInfo;