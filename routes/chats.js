const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const middleAuth = require('../middleWare/auth');
const { Chat } = require('../models/Chat');
const { Message } = require('../models/Message');
const { User } = require('../models/User');


/* Get certain chat */
router.get('/chats/:id', middleAuth, async function(req, res, next) {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified chat id is not valid' });
        return;
    }

        try {
            let chat = await Chat.findById(id).populate("speakerFirst speakerSecond messages");

            res.status(200)
                .json(chat);

        } catch(ex) {
            return next(ex);
        }

});

/* Get all the chats */
router.get('/chats', middleAuth, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const resultUser = await User.findById(_id).select("chats").populate({
            path: 'chats',
            model: 'Chat',
            populate: [{
                            path: 'speakerFirst speakerSecond',
                            model: 'User'
                        },
                        {
                            path: 'messages',
                            model: 'Message'
                        }
            ]
        });


        res.status(200)
            .json(resultUser.chats);

    } catch(ex) {
        return next(ex);
    }

});

/* Create new chat */
router.post('/chats', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    const { id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified user id is not valid' });
        return;
    }

    try {
        const newChat = new Chat({
            speakerFirst: _id,
            speakerSecond: id
        });

        const result = await newChat.save();
        const currentUser = await User.findById(_id).select("chats");
        currentUser.chats = [result._id, ...currentUser.chats];

        await currentUser.save();

        const resultChat = await Chat.findById(result._id).populate("speakerFirst speakerSecond");

        res.status(201)
            .json(resultChat);

    } catch(ex) {
        return next(ex);
    }

});

/* Delete  chat */
router.delete('/chats/:id', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified chat id is not valid' });
        return;
    }

    try {

        const chat = await Chat.findById(id).select("speakerFirst speakerSecond");
        const userOne = await User.findById(chat.speakerFirst).select("chats");
        const userTwo = await User.findById(chat.speakerSecond).select("chats");

        userOne.chats = userOne.chats.filter(chat => {
            return String(chat) !== String(chat._id);
        });

        await userOne.save();

        userTwo.chats = userTwo.chats.filter(chat => {
            return String(chat) !== String(chat._id);
        });

        await userTwo.save();

        await Chat.findByIdAndRemove(chat._id);

        const resultUser = await User.findById(_id).select("chats").populate({
            path: 'chats',
            model: 'Chat',
            populate: {
                path: 'speakerFirst speakerSecond',
                model: 'User'
            }
        });

        res.status(201)
            .json(resultUser.chats);

    } catch(ex) {
        return next(ex);
    }

});


module.exports = router;