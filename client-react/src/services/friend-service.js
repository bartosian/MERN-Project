
import axios from 'axios';

class FriendService {
    constructor() {
        let friendService = axios.create({
            baseURL: `https://be-in-touch.herokuapp.com/api`,
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

    getCertainFriend = (name) => {
        return this.friendService.get(`/friends/search/${name}`)
            .then(response => response.data)
    };

    getFriends = () => {
        return this.friendService.get('/friends')
            .then(response => response.data)
    };

}

export default FriendService;