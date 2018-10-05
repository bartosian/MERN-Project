import React, { Component, Fragment } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { Switch, Route } from 'react-router-dom';
import Edit from './EditPage/Edit';
import Main from './MainPage/Main';


class Profile extends Component {

    state = {
      user: this.props.loggedInUser
    };

    changeUser = (newUser) => {
        this.setState({
            user: newUser
        });
    };

    render() {

        const{ user } = this.state;
        const { logout, getUser } = this.props;
        const path = this.props.match.url;

        return (
            <Fragment>
                    <Header logout={ logout }/>
                <Switch>
                    <Route path={`${path}/edit`} render={(props) => <Edit {...props} user={ user } getUser={ getUser } changeUser={ this.changeUser }/> }/>
                    <Route path={ path } render={(props) => <Main {...props} user={ user }/> }/>
                </Switch>

            </Fragment>
        );
    }
}

export default Profile;