import React, { Fragment } from 'react';
import  './PersonalDetails.css';

const details = (props) => {

    const DOB = props.dob || (
        <i className="fa fa-search-plus empty-data" aria-hidden="true"></i>
    );

    const status = props.status || (
        <i className="fa fa-search-plus empty-data" aria-hidden="true"></i>
    );

    const contacts = (props.contacts && props.contacts.length) ? props.contacts : (
        <i className="fa fa-search-plus empty-data" aria-hidden="true"></i>
    );

    return (
        <Fragment>
            <div className="col-12 col-md-4 personal-detail">
                <h5><i className="fa fa-birthday-cake detail-icon text-primary"></i>Date of Birth</h5>
                <p>{ DOB }</p>
            </div>
            <div className="col-12 col-md-4 personal-detail">
                <h5><i className="fa fa-heart detail-icon text-primary"></i>Status</h5>
                <p>{ status }</p>
            </div>
            <div className="col-12 col-md-4 personal-detail">
                <h5><i className="fa fa-address-book detail-icon text-primary"></i>Contact info</h5>
                <p>{ contacts }</p>
            </div>
        </Fragment>
    )
};

export default details;