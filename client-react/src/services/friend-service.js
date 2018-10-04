
import axios from 'axios';

class FriendService {
    constructor() {
        let friendService = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.friendService = friendService;
    }

    addFriend = ({id}) => {
        return this.friendService.post('/friends', {id})
            .then(response => response.data)
    };

    deleteFriend = ({id}) => {
        return this.friendService.delete(`/friends/${id}`)
            .then(response => response.data)
    };

    getFriend = ({id}) => {
        return this.friendService.get(`/friends/${id}`)
            .then(response => response.data)
    };

    getFriends = () => {
        return this.friendService.get('/friends')
            .then(response => response.data)
    };

}

export default FriendService;