import React from 'react';
import Picture from '../MainPage/PictureBlock/PictureBlock';
import PersonalInfo from '../MainPage/PersonalInfo/PersonalInfo';
import Friends from '../MainPage/Friends/Friends';
import Wall from '../MainPage/Wall/Wall';

const MainPage = ({user, getUser}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <Picture user={ user } getUser={ getUser }/>
                </div>
                <div className="col-12 col-md-8">
                    <PersonalInfo user={ user }/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Friends user={ user }/>
                </div>
                <div className="col-12 col-md-6">
                    <Wall user={ user }/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;