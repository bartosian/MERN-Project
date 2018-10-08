const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const middleAuth = require('../middleWare/auth');
const { Chat } = require('../models/Chat');
const { Message } = require('../models/Message');
const { User } = require('../models/User');


/* Create new chat */
router.post('/chats/new', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { message, speakerId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(speakerId)) {
        res.status(400)
            .json({ message: 'Specified id is not valid' });
        return;
    }

    try {

        const newMessage = new Message({
            user: _id,
            content: message
        });

        let newChat = new Chat({
            speakerFirst: _id,
            speakerSecond: speakerId,
            messages: [...newMessage]
        });

        newChat = await newChat.save();
        chatId = newChat._id;

        const userOne = await User.findById(_id).select('chats');
        const userTwo = await User.findById(speakerId).select('chats');

        userOne.chats = [chatId, ...userOne.chats];
        userTwo.chats = [chatId, ...userTwo.chats];

        await userOne.save();
        await userTwo.save();


        res.status(201)
            .json(newChat);
    } catch(ex) {
        return next(ex);
    }
});


/* Create new chat */
router.post('/chats/new', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    let { message, speakerId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(speakerId)) {
        res.status(400)
            .json({ message: 'Specified id is not valid' });
        return;
    }

    try {

        const newMessage = new Message({
            user: _id,
            content: message
        });

        let newChat = new Chat({
            speakerFirst: _id,
            speakerSecond: speakerId,
            messages: [...newMessage]
        });

        newChat = await newChat.save();
        chatId = newChat._id;

        const userOne = await User.findById(_id).select('chats');
        const userTwo = await User.findById(speakerId).select('chats');

        userOne.chats = [chatId, ...userOne.chats];
        userTwo.chats = [chatId, ...userTwo.chats];

        await userOne.save();
        await userTwo.save();


        res.status(201)
            .json(newChat);
    } catch(ex) {
        return next(ex);
    }
});


module.exports = router;