import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute  = ({component: Component, user, logout, ...rest}) => {

    return (
        <Route
            {...rest}
            render={ props  => {
                if(user){
                    return <Component {...props} loggedInUser={user} logout={ logout }/>
                } else {
                    return <Redirect to={{pathname: '/', state: {from: props.location}}} />
                }
            }
            }
        />
    )
};


export default protectedRoute;