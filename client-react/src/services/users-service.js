import axios from 'axios';

class UsersService {
    constructor() {
        let usersService = axios.create({
            baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        });
        this.usersService = userService;
    }

    getUsers = () => {
        return this.usersService.get('/')
            .then(response => response.data)
    };
}

export default UsersService;