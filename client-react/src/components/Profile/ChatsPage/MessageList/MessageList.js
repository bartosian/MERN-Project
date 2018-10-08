import React, { Component } from 'react';
import './MessageList.css';
import { withRouter } from "react-router";
import ChatService from '../../../../services/chat-service';

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.service = new ChatService();
    }

    state = {
        chat: null
    };

    componentDidMount() {
        this.service.getChat(this.props.match.params.id)
            .then(response => {
                this.setState({
                    chat: response
                });
            })
    }

    render() {

        return (
            <div className="row messages-main-wrapper">
                <div className="col-10 col-md-8 messages-wrapper">
                    <div className="row messages-window">

                    </div>
                    <div className="row messages-input">

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MessageList);