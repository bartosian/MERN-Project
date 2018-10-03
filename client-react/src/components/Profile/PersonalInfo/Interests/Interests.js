import React, { Fragment } from 'react';
import './Interests.css';

const interests = ({ interests }) => {

    const interestList = interests && (
        <div className="int-boiler">
            <i className="fa fa-list-alt" aria-hidden="true"></i>
            <p>You can add your interests here</p>
        </div>
    );

    return (
        <Fragment>
            {
                interestList.length ? interestList.map((i, id) => (
                    <div key={i + id} className="interest">{i}</div>
                )) : interestList
            }
        </Fragment>
    )
};

export default interests;