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
                            <div className="col-12 col-md-4 personal-detail">
                                <h5><i className="fa fa-birthday-cake detail-icon text-primary"></i>Date of Birth</h5>
                            </div>
                            <div className="col-12 col-md-4 personal-detail">
                                <h5><i className="fa fa-heart detail-icon text-primary"></i>Status</h5>
                            </div>
                            <div className="col-12 col-md-4 personal-detail">
                                <h5><i className="fa fa-address-book detail-icon text-primary"></i>Contact info</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PersonalInfo;