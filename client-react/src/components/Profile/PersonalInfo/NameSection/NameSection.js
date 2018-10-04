import React, { Fragment } from 'react';
import './NameSection.css';

const name = ({ username }) => {


    return (
        <Fragment>
            <i className="fa fa-user-circle person-icon text-primary"></i>
            <h1 className='name-main'>{ username }</h1>
        </Fragment>
    )
};

export default name;