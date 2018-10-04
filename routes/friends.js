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

/* Get certain friend */
router.get('/friends/:id', middleAuth, async function(req, res, next) {
    let { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified id is not valid' });
        return;
    }

    try {
        const friend = await User.findById(id).populate('friends posts');

        res.status(200)
            .json(friend);
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