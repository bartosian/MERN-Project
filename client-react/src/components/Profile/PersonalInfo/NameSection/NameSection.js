import React, { Fragment } from 'react';

const name = ({ username }) => {


    return (
        <Fragment>
            <i className="fa fa-user-circle person-icon text-primary"></i>
            <h1>{ username }</h1>
        </Fragment>
    )
};

export default name;