import React, { Fragment } from 'react';
import './Interests.css';

const interests = ({ interests }) => {

    const interestList = interests.length !== 0 ? interests : (
        <div className="int-boiler">
            <i className="fa fa-list-alt" aria-hidden="true"></i>
            <p>You can add your interests here</p>
        </div>
    );

    return (
        <Fragment>
            {
                interestList.length ? interestList.length > 10 ? interestList.slice(0, 10).map((i, id) => (
                    <div key={i + id} className="interest">{i}</div>
                )) :  interestList.map((i, id) => (
                    <div key={i + id} className="interest">{i}</div>
                )) : interestList
            }
        </Fragment>
    )
};

export default interests;