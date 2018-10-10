import React, { Component } from 'react';
import './Chats.css';
import ChatService from "../../../services/chat-service";
import Chat from './Chat/Chat';
import { Switch, Route, Link } from 'react-router-dom';
import ChatList from './ChatList';
import MessageList from './MessageList/MessageList';

class Chats extends Component {

    constructor(props) {
        super(props);
        this.service = new ChatService();
    }

    state = {
        chats: []
    };

    componentDidMount() {
        this.service.getAllChats()
            .then(response => {

                this.setState({
                    chats: response
                });

            }).catch(err => {
            console.log(err);
        });
    }

    redirectToMessages = (idChat) => {
        this.props.history.push(`/profile/chats/${idChat}`);
    };



    render() {
        const { path, user } = this.props;

        const chats = this.state.chats.length > 0 ? (
            this.state.chats.sort((c1, c2) => {
                const date1 = new Date(c1.updated_at);
                const date2 = new Date(c2.updated_at);

                if(date1 > date2) {
                    return -1;
                } else if(date1 < date2) {
                    return 1;
                } else {
                    return 0;
                }
            }).map( n => (
                <Chat key={ n._id } {...n}  getUser={ this.props.getUser } user={ this.props.user } redirectMessages = { this.redirectToMessages } />
            ))
        ) : (<div className="row no-wrapper">
            <div className="col-12 col-md-7 no-news">
                <Link to="/profile/users" className="navLink"><i className="fa fa-users empty-friends" aria-hidden="true"></i></Link>
                You don't have any chats yet.
            </div>
            </div>);

        return (
            <div className="container chats-wrapper main-content-footer">
                <Switch>
                    <Route path={`${path}/chats/:id`} render={() => <MessageList chats={ chats } user={ user }/> }/>
                    <Route path={`${path}/chats`} render={() => <ChatList chats={ chats }/> }/>
                </Switch>

            </div>
        );
    }
}

export default Chats;