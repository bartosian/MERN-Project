const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const middleAuth = require('../middleWare/auth');
const { User } = require('../models/User');

/* Add new friend */
router.post('/friends/:id', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified id is not valid' });
        return;
    }

    try {
        const user = await User.findById(_id);
        const friend = user.friends.find((f) => {
            return String(f._id) === id;
        });


        if(friend) {
            res.status(400)
                .json({ message: 'Specified friend exist already' });
            return;
        }

        user.friends.push(id);
        await user.save();

        const updatedFriends = await User.findById(_id).select('friends').populate('friends');


        res.status(201)
            .json(updatedFriends.friends);
    } catch(ex) {
        return next(ex);
    }
});

/* Delete friend */
router.delete('/friends/:id', middleAuth, async function(req, res, next) {
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