import axios from 'axios';

class UserService {
    constructor() {
        let userService = axios.create({
            baseURL: 'http://localhost:5000/api/user',
            withCredentials: true
        });
        this.userService = userService;
    }

    changeName = ({username}) => {
        return this.userService.post('/name', {username})
            .then(response => response.data)
    };

    changeStatus = ({status}) => {
        return this.userService.post('/status', {status})
            .then(response => response.data)
    };

    changeDob = ({dob}) => {
        return this.userService.post('/dob', {dob})
            .then(response => response.data)
    };

    changeInterests = ({interests}) => {
        return this.userService.post('/interests', {interests})
            .then(response => response.data)
    };

    changeContacts = (contact) => {
        return this.userService.post('/contacts', contact)
            .then(response => response.data)
    };

}

export default UserService;