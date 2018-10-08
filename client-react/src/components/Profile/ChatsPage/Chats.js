import React, { Component } from 'react';
import './Chats.css';
import ChatService from "../../../services/chat-service";

class Chats extends Component {

    constructor(props) {
        super(props);
        this.service = new ChatService();
    }

    state = {
        chats: []
    };

    render() {
        return (

        );
    }
}

export default Chats;