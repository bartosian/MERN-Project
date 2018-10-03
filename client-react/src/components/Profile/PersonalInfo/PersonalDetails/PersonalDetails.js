import React, { Fragment } from 'react';

const details = (props) => {


    return (
        <Fragment>
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
        </Fragment>
    )
};

export default details;