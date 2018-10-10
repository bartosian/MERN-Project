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
        file: "",
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

        if(e.target.name === "picture-user") {
            this.setState({
                file: e.target.files[0]
            });

            return;
        }

        const newMessage = Object.assign({},{...this.state.message}, { value: e.target.value });

        this.setState({
            message: newMessage
        });
    };

    addNewMessage = () => {

        if((this.state.message.value.trim() === "" && this.state.file === "") || this.state.loading) {
            return;
        }

        this.setState({
            loading: true
        });
        const id = this.state.chat._id;

        if(this.state.file) {
            const file = this.state.file;

            this.service.addPicture(file, id)
                .then( response => {
                    this.setState({
                        chat: response,
                        loading: false,
                        file: ""
                    });

                    this.messages.scrollTop = this.messages.scrollHeight;
                }).catch(err => console.log(err));

        } else {
            const content = this.state.message.value;
            const newMessage = Object.assign({},{...this.state.message}, { value: ""});

            this.service.addNewMessage(id, content)
                .then(response => {
                    this.setState({
                        chat: response,
                        message: newMessage,
                        loading: false
                    });


                    this.messages.scrollTop = this.messages.scrollHeight;
                }).catch(err => console.log(err));
        }

    };

    selectPhoto = () => {
        this.input.click();
    };

    handleSubmit = () => {
        this.authService.addPicture(this.state.file)
            .then( data => {
                this.setState({
                    file: data.image,
                    showImage: true
                });

                const newUser = {...this.props.user};
                newUser.image = data.image;

                this.props.getUser(newUser);
            });
    };

    render() {

        const { messages, speakerFirst, speakerSecond } = this.state.chat;
        const { _id } = this.props.user;
        let speaker2 = null;


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
        }).map((m, id) => {
            if(m.user === speakerFirst._id) {
                speaker2 = speakerFirst.image;
            } else {
                speaker2 = speakerSecond.image;
            }

               return <MessageItem {...m} key={id + m._id} userId={ _id } image={ speaker2 }/>
                })
        ) : [];

        return (
            <div className="row messages-main-wrapper">
                <div className="col-10 col-md-8 messages-wrapper">
                    <div className="messages-window" ref={(node) => this.messages = node}>
                        { messagesArr.length > 0 ? messagesArr : (
                            <div className="no-messages">
                                Start this chat - write first message!
                            </div>
                        ) }
                    </div>
                    <div className="messages-input">
                        <div className="send-picture" onClick={ this.selectPhoto }>
                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                        </div>
                        <div className="input-message">
                            <input className="photo-loader" ref={ (node) => this.input = node } onChange={ (event) => this.inputChangedHandler(event)}  name="picture-user"  type="file"/>
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