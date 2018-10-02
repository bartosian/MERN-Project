import React, { Component } from 'react';
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
                    <i className="fa fa-user-circle person-icon text-primary"></i>
                    <h1>User name</h1>
                </div>
                <div className="user-info">
                    <div className="row summary">
                        <div className="row personal-details">
                            <div className="col-12 col-md-4 personal-detail">
                                <h5><i className="fa fa-birthday-cake detail-icon text-primary"></i>Date of Birth</h5>
                                <p>15.12.1989</p>
                            </div>
                            <div className="col-12 col-md-4 personal-detail">
                                <h5><i className="fa fa-heart detail-icon text-primary"></i>Status</h5>
                                <p>married</p>
                            </div>
                            <div className="col-12 col-md-4 personal-detail">
                                <h5><i className="fa fa-address-book detail-icon text-primary"></i>Contact info</h5>
                                <ul>
                                    <li className='social-link'><i className="fa fa-envelope text-danger"></i>Gmail</li>
                                    <li className='social-link'><i className="fa fa-linkedin text-secondary"></i>Linkedin</li>
                                    <li className='social-link'><i className="fa fa-skype text-primary"></i>Scype</li>
                                </ul>
                            </div>
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