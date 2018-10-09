import axios from 'axios';

class UserService {
    constructor() {
        let userService = axios.create({
            baseURL: `https://be-in-touch.herokuapp.com/api`,
            withCredentials: true
        });
        this.userService = userService;
    }

    changeName = ({username}) => {
        return this.userService.post('/name', {username})
            .then(response => response.data)
    };

    changeCountry = ({country}) => {
        return this.userService.post('/country', {country})
            .then(response => response.data)
    };

    changeOccupation = ({occupation}) => {
        return this.userService.post('/occupation', {occupation})
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