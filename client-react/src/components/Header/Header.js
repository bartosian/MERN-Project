import React from 'react';
import './Header.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const header = (props) => {

    return (
        <div className="container">
            <div className="col-12 header-comp">
                <div className="logo-bar">
                    <div className="logo">
                        <img className="logo-img" src="http://www.broutinwebpublishing.com/wp-content/uploads/2016/04/social-media-local-1024x723.png" alt="logo"/>
                    </div>
                    <h1 className="main-logo--navbar">InTouch</h1>
                </div>
                <nav className="main-nav">
                    <div className="search">
                        <Input />
                        <Button />
                    </div>
                    <div className="logout">
                        <Button />
                    </div>
                </nav>

            </div>
        </div>
    );

};

export default header;