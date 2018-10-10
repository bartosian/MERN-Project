
import axios from 'axios';

class ChatService {
    constructor() {
        let chatService = axios.create({
            baseURL: `https://be-in-touch.herokuapp.com/api`,
            withCredentials: true
        });
        this.chatService = chatService;
    }

    addNewMessage = (id, content) => {
        return this.chatService.post('/messages', {id, content})
            .then(response => response.data)
    };

    addPicture(file, id) {
        const formData = new FormData();
        formData.append("picture", file);
        return this.chatService
            .post(`/messages/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => res.data);
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