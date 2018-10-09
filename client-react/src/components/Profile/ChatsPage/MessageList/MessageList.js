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
        },
        loading: false
    };

    componentDidMount() {

        if(this.props.match.params.id.includes("new")) {
            let id = this.props.match.params.id;
            id = id.slice(3);

            this.service.createChat(id)
                .then(response => {
                    this.setState({
                        chat: response
                    });

                    this.messages.scrollTop = this.messages.scrollHeight;
                    return;

                }).catch(err => console.log(err));
        } else {
            this.service.getChat(this.props.match.params.id)
                .then(response => {
                    this.setState({
                        chat: response
                    });

                    this.messages.scrollTop = this.messages.scrollHeight;
                }).catch(err => console.log(err));
        }
    }

    inputChangedHandler = (e) => {

        const newMessage = Object.assign({},{...this.state.message}, { value: e.target.value });

        this.setState({
            message: newMessage
        });
    };

    addNewMessage = () => {

        this.setState({
            loading: true
        });
        const id = this.state.chat._id;
        const content = this.state.message.value;
        const newMessage = Object.assign({},{...this.state.message}, { value: ""});

        if(content.trim() === "" || this.state.loading) {
            return;
        }

        this.service.addNewMessage(id, content)
            .then(response => {
                this.setState({
                    chat: response,
                    message: newMessage,
                    loading: false
                });


                this.messages.scrollTop = this.messages.scrollHeight;
            }).catch(err => console.log(err));
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
                    <div className="messages-window" ref={(node) => this.messages = node}>
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
                        <div className="send-message" onClick={ this.addNewMessage }>
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MessageList);