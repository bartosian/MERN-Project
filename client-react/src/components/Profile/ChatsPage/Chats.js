import React, { Component } from 'react';
import './Chats.css';
import ChatService from "../../../services/chat-service";
import Chat from './Chat/Chat';
import { Switch, Route } from 'react-router-dom';
import ChatList from './ChatList';

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

    render() {
        const { path } = this.props;

        const chats = this.state.chats.length > 0 ? (
            this.state.chats.map( n => (
                <Chat key={ n._id } {...n}  getUser={ this.props.getUser } user={ this.props.user } />
            ))
        ) : (<div className="row no-wrapper">
                <div className="col-12 col-md-7 no-news">You don't have any chats yet.</div>
            </div>);

        return (
            <div className="container chats-wrapper">
                <Switch>
                    <Route path={`${path}/chats`} render={(props) => <ChatList chats={ chats }/> }/>
                </Switch>

            </div>
        );
    }
}

export default Chats;