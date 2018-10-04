const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
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
            content,
            username: user.username
        });

        user.posts.push(newPost);
        await user.save();


        const copyPosts = [...user.posts];

         res.status(201)
            .json(copyPosts);
    } catch(ex) {
        return next(ex);
    }
});

/* Delete post */
router.delete('/posts/:id', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified id is not valid' });
        return;
    }

    try {
        let user = await User.findById(_id).select('posts');
        const updatedPosts = user.posts.filter(post => {

            return String(post._id) !== id;
        });

        user.posts = [...updatedPosts];
        await user.save();

        res.status(200)
            .json(updatedPosts);
    } catch(ex) {
        return next(ex);
    }
});


/* Edit post */
router.put('/posts/:id', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    const { id } = req.params;
    const { content } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified id is not valid' });

        return;
    }

    if(!content) {
        res.status(400)
            .json({
                message: "You need to provide new content"
            });

        return;
    }


    try {
        let user = await User.findById(_id).select('posts');
        const post = user.posts.id(id);
        post.content = content;

        await user.save();

        const updatedPosts = [...user.posts];

        res.status(203)
            .json(updatedPosts);
    } catch(ex) {
        return next(ex);
    }
});


/* Get friends posts */
router.get('/friends/posts', middleAuth, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id).populate('friends');
        if(user.friends.length === 0) {
            res.status(200)
                .json({
                    message: "You don't have any friends"
                });
        }

        const posts = user.friends.reduce((arr,friend) => {
            return arr.concat(friend.posts);
        }, []);

        res.status(200)
            .json(posts);
    } catch(ex) {
        return next(ex);
    }
});


module.exports = router;