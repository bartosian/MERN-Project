import React, { Component } from 'react';
import './MessageList.css';
import { withRouter } from "react-router";
import ChatService from '../../../../services/chat-service';
import MessageItem from './MessageItem/MessageItem';
import Input from '../../../UI/Input/Input';

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.service = new ChatService();
    }

    state = {
        chat: [],
        message: {
            elementType: 'textarea',
            elementConfig: {
                placeholder: "Enter new message"
            },
            value: ""
        }
    };

    componentDidMount() {
        this.service.getChat(this.props.match.params.id)
            .then(response => {
                this.setState({
                    chat: response
                });

            })
    }

    inputChangedHandler = (e) => {

        const newMessage = Object.assign({},{...this.state.message}, { value: e.target.value });

        this.setState({
            message: newMessage
        });
    };

    render() {

        const { messages, speakerFirst, speakerSecond } = this.state.chat;
        const { _id } = this.props.user;
        let speaker2 = null;

        if(speakerSecond && speakerFirst) {
             speaker2 = String(_id) === speakerSecond._id ? speakerFirst.image : speakerSecond.image;
        }


        let messagesArr = (messages && messages.length > 0) ? (
            messages.sort((m1, m2) => {

            const date1 = new Date(m1.date);
            const date2 = new Date(m2.date);

            if(date1 > date2) {
                return 1;
            } else if(date1 < date2) {
                return -1;
            } else {
                return 0;
            }
        }).map((m, id) => (
               <MessageItem {...m} key={id + m._id} userId={ _id } image={ speaker2 }/>
            ))
        ) : null;

        return (
            <div className="row messages-main-wrapper">
                <div className="col-10 col-md-8 messages-wrapper">
                    <div className="messages-window">
                        { messagesArr }
                    </div>
                    <div className="messages-input">
                        <div className="input-message">
                            <Input
                                   elementType={ this.state.message.elementType }
                                   elementConfig={ this.state.message.elementConfig}
                                   value={ this.state.message.value }
                                   changed={ (event) => this.inputChangedHandler(event) }
                            />
                        </div>
                        <div className="send-message">
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MessageList);