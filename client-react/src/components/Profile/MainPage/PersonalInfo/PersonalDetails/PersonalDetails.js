import React, { Fragment } from 'react';
import './PersonalDetails.css';
import { Link } from 'react-router-dom';

const details = ({dob, status, contacts, country, occupation }) => {

    const DOB = dob || (
        <Link to="/profile/edit" className="navLink"><i className="fa fa-search-plus empty-data" aria-hidden="true"></i></Link>
    );

    const Status = status || (
        <Link to="/profile/edit" className="navLink"><i className="fa fa-search-plus empty-data" aria-hidden="true"></i></Link>
    );

    const Occupation = occupation || (
        <Link to="/profile/edit" className="navLink"><i className="fa fa-search-plus empty-data" aria-hidden="true"></i></Link>
    );

    const Country = country || (
        <Link to="/profile/edit" className="navLink"><i className="fa fa-search-plus empty-data" aria-hidden="true"></i></Link>
    );



    return (
        <Fragment>
            <div className="col-12 col-md-4 personal-detail">
                <h5><i className="fa fa-birthday-cake detail-icon text-primary"></i>Date of Birth</h5>
                <p>{ DOB }</p>
                <h5><i className="fa fa-globe detail-icon text-primary"></i>Country</h5>
                <p>{ Country }</p>
                <Link to="/profile/users">users</Link>
            </div>
            <div className="col-12 col-md-4 personal-detail">
                <h5><i className="fa fa-heart detail-icon text-primary"></i>Status</h5>
                <p>{ Status }</p>
                <h5><i className="fa fa-briefcase detail-icon text-primary"></i>Occupation</h5>
                <p>{ Occupation }</p>
            </div>
            <div className="col-12 col-md-4 personal-detail">
                <h5><i className="fa fa-address-book detail-icon text-primary"></i>Contact info</h5>
                <ul className="social-links">
                    <li><i className="fa fa-envelope mail" aria-hidden="true"></i><span>{(contacts && contacts.email) || 'not specified'}</span></li>
                    <li><i className="fa fa-linkedin-square linked" aria-hidden="true"></i><span>{(contacts && contacts.linkedIn) || 'not specified'}</span></li>
                    <li><i className="fa fa-instagram insta" aria-hidden="true"></i><span>{(contacts && contacts.instagram) || 'not specified'}</span></li>
                    <li><i className="fa fa-facebook-official facebook text-primary" aria-hidden="true"></i><span>{(contacts && contacts.facebook) || 'not specified'}</span></li>
                </ul>
            </div>
        </Fragment>
    )
};

export default details;