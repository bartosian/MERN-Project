import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

const navBar = (props) => {

    return (
        <div className="navBar-main">
            <div className="navBar-links">
                <NavLink  className="main-link" activeClassName="active-link" to="/profile/edit">Settings</NavLink>
                <NavLink  className="main-link" activeClassName="active-link" to="/profile/users">Users</NavLink>
                <NavLink  className="main-link" activeClassName="active-link" to="/profile/news">News</NavLink>
                <NavLink  className="main-link" activeClassName="active-link" to="/profile/chats">Messages</NavLink>
            </div>
        </div>
    );
};

export default navBar;