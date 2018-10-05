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

/* Edit dob of user */
router.post('/user/dob', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { dob } = req.body;

    if(!dob || dob.length === 0) {
        res.status(400)
            .json({ message: 'Day of birth can not be empty' });
        return;
    }

    try {

        const user = await User.findById(_id);
        user.dob = dob.trim();

        await user.save();

        res.status(203)
            .json(user);
    } catch(ex) {
        return next(ex);
    }
});

/* Edit interests of user */
router.post('/user/interests', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { interests } = req.body;

    if(!interests || interests.length === 0) {
        res.status(400)
            .json({ message: 'Interests can not be empty' });
        return;
    }

    try {
        const user = await User.findById(_id);
        let newInterests = interests.trim().split(",");
        newInterests = newInterests.map(itr => itr.trim());


        user.interests = newInterests;

        await user.save();

        res.status(203)
            .json(user);
    } catch(ex) {
        return next(ex);
    }
});

module.exports = router;