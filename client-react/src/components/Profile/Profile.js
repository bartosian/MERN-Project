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
import UsersService from '../../services/users-service';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.service = new UsersService();
    }

    state = {
      user: this.props.loggedInUser,
      users: []
    };

    changeUser = (newUser) => {
        this.props.getUser(newUser);
    };

    componentDidMount() {

        this.service.getUsers()
            .then(response => {
                const newUsers = response.filter(u => u._id !== this.state.user._id);
                this.setState({
                    users: newUsers
                });
            }).catch(err => {
            console.log(err);
        });
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
                    <Route path={`${path}/users/friends`} render={(props) => <Users {...props} user={ user } getUser={ getUser } users={ this.state.user.friends } setUsers={ this.setUsers }/> }/>
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