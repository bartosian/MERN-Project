import React, { Fragment } from 'react';
import './NameSection.css';
import { Link } from 'react-router-dom';

const name = ({ username }) => {


    return (
        <Fragment>
            <Link to='/profile/edit' className="navLink"><i className="fa fa-user-circle person-icon text-primary"></i></Link>
            <h1 className='name-main'>{ username }</h1>
        </Fragment>
    )
};

export default name;