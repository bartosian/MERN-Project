
import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL:`https://be-in-touch.herokuapp.com/Auth`,
            withCredentials: true
        });
        this.service = service;
    }

    signup = ({username, password, email} ) => {
        return this.service.post('/signup', {username, password, email })
            .then(response => response.data)
    };

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    };

    login = ({email, password}) => {
        return this.service.post('/login', {email, password})
            .then(response => response.data)
    };

    logout = () => {
        return this.service.post('/logout', {})
            .then(response => response.data)
    };

    addPicture(file) {
        const formData = new FormData();
        formData.append("picture", file);
        console.log('DEBUG formData', formData.get("picture"));
        return this.service
            .post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => res.data);
    }
}

export default AuthService;