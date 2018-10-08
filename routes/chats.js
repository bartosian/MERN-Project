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

/* Create new chat */
router.post('/chats', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified user id is not valid' });
        return;
    }

    try {
        let newChat = new Chat({
            speakerFirst: _id,
            speakerSecond: id
        });

        newChat = await newChat.save();
        newChat = Chat.findById(newChat._id).populate("speakerFirst speakerSecond");

        res.status(201)
            .json(newChat);

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