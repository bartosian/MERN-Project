import React, { Component, Fragment } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { Switch, Route } from 'react-router-dom';
import Edit from './EditPage/Edit';
import Main from './MainPage/Main';
import Chats from './ChatsPage/Chats';
import Users from './UsersPage/Users';
import Footer from '../Footer/Footer';
import News from './NewsPage/News';


class Profile extends Component {

    state = {
      user: this.props.loggedInUser
    };

    changeUser = (newUser) => {
        this.props.getUser(newUser);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.loggedInUser
        });
    }

    render() {

        const{ user } = this.state;
        const { logout, getUser } = this.props;
        const path = this.props.match.url;

        return (
            <Fragment>
                    <Header logout={ logout }/>
                <Switch>
                    <Route path={`${path}/chats`} render={(props) => <Chats {...props} user={ user } getUser={ getUser } /> }/>
                    <Route path={`${path}/chats/:id`} render={(props) => <Chats {...props} user={ user } getUser={ getUser } /> }/>
                    <Route path={`${path}/news`} render={(props) => <News {...props} user={ user } getUser={ getUser } /> }/>
                    <Route path={`${path}/users`} render={(props) => <Users {...props} user={ user } getUser={ getUser } /> }/>
                    <Route path={`${path}/edit`} render={(props) => <Edit {...props} user={ user } getUser={ getUser } changeUser={ this.changeUser }/> }/>
                    <Route path={ path } render={(props) => <Main {...props} user={ user } getUser={ getUser }/> }/>
                </Switch>
                    <Footer />
            </Fragment>
        );
    }
}

export default Profile;