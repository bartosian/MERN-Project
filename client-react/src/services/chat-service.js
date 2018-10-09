
import axios from 'axios';

class ChatService {
    constructor() {
        let chatService = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.chatService = chatService;
    }

    addNewMessage = (id, content) => {
        return this.chatService.post('/messages', {id, content})
            .then(response => response.data)
    };

    createChat = (id) => {
        return this.chatService.post('/chats', {id})
            .then(response => response.data)
    };

    getChat = (id) => {
        return this.chatService.get(`/chats/${id}`)
            .then(response => response.data)
    };

    getAllChats = () => {
        return this.chatService.get('/chats')
            .then(response => response.data)
    };

    deleteChat = (id) => {
        return this.postService.delete(`/chats/${id}`)
            .then(response => response.data)
    };

}

export default ChatService;