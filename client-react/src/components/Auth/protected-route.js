import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute  = ({component: Component, user, logout, getUser, ...rest}) => {

    return (
        <Route
            {...rest}
            render={ props  => {

                console.log(user);
                if(user){
                    return <Component {...props} loggedInUser={user}  logout={ logout } getUser={ getUser }/>
                } else {
                    return <Redirect to={{pathname: '/', state: {from: props.location}}} />
                }
            }
            }
        />
    )
};


export default protectedRoute;