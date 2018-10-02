import React, { Component } from 'react';
import './PersonalInfo.css';

class PersonalInfo extends Component {



    render() {

        return (
            <div className="container">
                <div className="col-12 user-name">
                    <i className="fa fa-user-circle person-icon text-primary"></i>
                    <h1>User name</h1>
                </div>
                <div className="user-info">
                    <div className="row summary">
                        <div className="row personal-details">
                            <div className="col-12 col-md-4">Date of Birth</div>
                            <div className="col-12 col-md-4">Status</div>
                            <div className="col-12 col-md-4">Contact info</div>
                        </div>
                    </div>
                    <div className="row interests">
                        <div className="col-12 interests-list">
                            InterestsList
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PersonalInfo;