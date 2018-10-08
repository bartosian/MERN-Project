import React, { Component } from 'react';
import './Chats.css';
import ChatService from "../../../services/chat-service";
import Chat from './Chat/Chat';

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

        const chats = this.state.chats.length > 0 ? (
            this.state.chats.map( n => (
                <Chat key={ n._id } {...n}  getUser={ this.props.getUser } user={ this.props.user } />
            ))
        ) : <p>No news</p>;

        return (
            <div className="container chats-wrapper">
                { chats }
            </div>
        );
    }
}

export default Chats;