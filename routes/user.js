const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const middleAuth = require('../middleWare/auth');
const { User } = require('../models/User');

/* Edit name of user */
router.post('/user/name', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { username } = req.body;

    if(!username || username.length === 0) {
        res.status(400)
            .json({ message: 'Username can not be empty' });
        return;
    }

    try {
        const user = await User.findById(_id);
        user.username = username.trim();

        await user.save();

        res.status(203)
            .json(user);
    } catch(ex) {
        return next(ex);
    }
});

/* Edit status of user */
router.post('/user/status', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { status } = req.body;

    if(!status || status.length === 0) {
        res.status(400)
            .json({ message: 'Status can not be empty' });
        return;
    }

    try {
        const user = await User.findById(_id);
        user.status = status.trim();

        await user.save();

        res.status(203)
            .json(user);
    } catch(ex) {
        return next(ex);
    }
});

/* Get all the friends */
router.get('/friends', middleAuth, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id).select('friends').populate('friends');

        res.status(200)
            .json(user.friends);
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
        let user = await User.findById(_id).select('friends');
        const updatedFriends = user.friends.filter(friend => {

            return String(friend._id) !== id;
        });

        user.friends = [...updatedFriends];
        await user.save();

        res.status(200)
            .json(updatedFriends);
    } catch(ex) {
        return next(ex);
    }
});

module.exports = router;