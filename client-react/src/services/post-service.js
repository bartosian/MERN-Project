
import axios from 'axios';

class PostService {
    constructor() {
        let postService = axios.create({
            baseURL: `https://be-in-touch.herokuapp.com/api`,
            withCredentials: true
        });
        this.postService = postService;
    }

    addPost = ({content}) => {
        return this.postService.post('/posts', {content})
            .then(response => response.data)
    };

    editPost = ({content, id}) => {
        return this.postService.put(`/posts/${id}`, {content})
            .then(response => response.data)
    };

    deletePost = ({id}) => {
        return this.postService.delete(`/posts/${id}`)
            .then(response => response.data)
    };

    getFriendsPosts = () => {
        return this.postService.get('/friends/posts')
            .then(response => response.data)
    };

    addLikeToPost = (userId, postId) => {
        return this.postService.post('/posts/change', {userId, postId})
            .then(response => response.data)
    };

}

export default PostService;