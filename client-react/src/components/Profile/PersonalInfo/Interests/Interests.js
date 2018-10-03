import React, { Fragment } from 'react';

const interests = ({ interests }) => {


    return (
        <Fragment>
            {
                interests.map((i, id) => (
                    <div key={i + id} className="interest">{i}</div>
                ))
            }
        </Fragment>
    )
};

export default interests;