const express = require('express');
const router  = express.Router();
const middleAuth = require('../middleWare/auth');
const { Post } = require('../models/Post');
const { User } = require('../models/User');

/* Add new post */
router.post('/posts', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { content } = req.body;

    try {
        const user = await User.findById(_id);
        const newPost = new Post({
            user: _id,
            content
        });

        user.posts.push(newPost);
        await user.save();

         res.status(201)
            .json(newPost);
    } catch(ex) {
        return next(ex);
    }
});

/* Get friends posts */
router.get('/friends/posts', middleAuth, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id).populate('friends');
        const posts = user.friends.reduce((arr,friend) => {
            return arr.push(...friend.posts);
        }, []);

        res.status(200)
            .json(posts);
    } catch(ex) {
        return next(ex);
    }
});


module.exports = router;