import axios from 'axios';

class UsersService {
    constructor() {
        let usersService = axios.create({
            baseURL: `https://be-in-touch.herokuapp.com/api/users`,
            withCredentials: true
        });
        this.usersService = usersService;
    }

    getUsers = () => {
        return this.usersService.get('/')
            .then(response => response.data)
    };
}

export default UsersService;