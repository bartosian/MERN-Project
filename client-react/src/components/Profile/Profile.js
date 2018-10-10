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
import NavBar from './MainPage/NavBar/NavBar';


class Profile extends Component {

    state = {
      user: this.props.loggedInUser,
      users: []
    };

    changeUser = (newUser) => {
        this.props.getUser(newUser);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.loggedInUser
        });
    }

    setUsers = (users) => {
        this.setState({
            users: users
        });
    };

    render() {

        const{ user } = this.state;
        const { logout, getUser } = this.props;
        const path = this.props.match.url;
        const { pathname } = this.props.location;

        return (
            <Fragment>
                    <Header logout={ logout } setUsers={ this.setUsers }/>
                {
                    pathname !== "/profile" ? ( <div className="row navbar-wrapper">
                        <div className="col-10 col-md-9">
                            <NavBar />
                        </div>
                    </div>) : null
                }

                <Switch>
                    <Route path={`${path}/chats`} render={(props) => <Chats path={ path } {...props} user={ user } getUser={ getUser } /> }/>
                    <Route path={`${path}/news`} render={(props) => <News {...props} user={ user } getUser={ getUser } /> }/>
                    <Route path={`${path}/users`} render={(props) => <Users {...props} user={ user } getUser={ getUser } users={ this.state.users } setUsers={ this.setUsers }/> }/>
                    <Route path={`${path}/edit`} render={(props) => <Edit {...props} user={ user } getUser={ getUser } changeUser={ this.changeUser }/> }/>
                    <Route path={ path } render={(props) => <Main {...props} user={ user } getUser={ getUser }/> }/>
                </Switch>
                    <Footer />
            </Fragment>
        );
    }
}

export default Profile;