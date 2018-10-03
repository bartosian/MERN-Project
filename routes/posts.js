const express = require('express');
const router  = express.Router();
const middleAuth = require('../middleWare/auth');
const { Post } = require('../models/Post');


/* Get events info */
router.get('/events', authToken, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        let events = user.events;


        return res.status(200)
            .json(
                events
            );
    } catch(ex) {
        return next(ex);
    }
});

/* Add new post */
router.post('/events', authToken, async function(req, res, next) {
    const { _id } = req.user;
    let { type, amount, category, date, description } = req.body;

    try {
        const user = await User.findById(_id);
        const newEvent = new Event({
            type,
            amount,
            category,
            date,
            description
        });

        user.events.push(newEvent);
        await user.save();

        return res.status(201)
            .json({
                "message": "Event was added successfully!"
            });
    } catch(ex) {
        return next(ex);
    }
});

module.exports = router;