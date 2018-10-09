import React, { Component } from 'react';
import './MessageList.css';
import { withRouter } from "react-router";
import ChatService from '../../../../services/chat-service';
import MessageItem from './MessageItem/MessageItem';

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.service = new ChatService();
    }

    state = {
        chat: []
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

        const { messages, speakerFirst, speakerSecond } = this.state.chat;
        const { _id } = this.props.user;

        let messagesArr = (messages && messages.length > 0) ? (
            messages.sort((m1, m2) => {

            const date1 = new Date(m1.date);
            const date2 = new Date(m2.date);

            if(date1 > date2) {
                return -1;
            } else if(date1 < date2) {
                return 1;
            } else {
                return 0;
            }
        }).map((m, id) => (
               <MessageItem {...m} key={id + m._id} userId={ _id }/>
            ))
        ) : null;

        return (
            <div className="row messages-main-wrapper">
                <div className="col-10 col-md-8 messages-wrapper">
                    <div className="messages-window">
                        { messagesArr }
                    </div>
                    <div className="row messages-input">

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MessageList);