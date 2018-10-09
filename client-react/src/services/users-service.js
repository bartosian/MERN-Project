import axios from 'axios';

class UsersService {
    constructor() {
        let usersService = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`,
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