const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const middleAuth = require('../middleWare/auth');
const { Chat } = require('../models/Chat');
const { Message } = require('../models/Message');
const { User } = require('../models/User');
const parser = require('../config/cloudinary');

/* Add new message */
router.post('/messages', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    const { id, content } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified chat id is not valid' });
        return;
    }

    try {

        const chat = await Chat.findById(id);
        const newMessage = new Message({
            user: _id,
            content
        });

        const mesResult = await newMessage.save();

        chat.messages = [mesResult._id, ...chat.messages];
        await chat.save();

        const userSecondId = String(chat.speakerFirst !== String(_id)) ? chat.speakerSecond : chat.speakerFirst;
        const userSecond = await User.findById(userSecondId).select("chats");
        const userSecondHasChat = userSecond.chats.filter(ch => String(ch) === String(id)).length > 0;

        if(!userSecondHasChat) {
            userSecond.chats = [id, ...userSecond.chats];
            await userSecond.save();
        }
        const chatResult = await Chat.findById(id).populate("speakerFirst speakerSecond messages");

        res.status(201)
            .json(chatResult);

    } catch(ex) {
        return next(ex);
    }

});

/* Delete  message */
router.delete('/messages/:chatId/:mesId', middleAuth, async function(req, res, next) {
    const { _id } = req.user;
    const { chatId, mesId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(chatId) || !mongoose.Types.ObjectId.isValid(mesId)) {
        res.status(400)
            .json({ message: 'Specified id is not valid' });
        return;
    }

    try {

        const chat = await Chat.findById(chatId);
        chat.messages = chat.messages.filter(m => {
            return String(m) !== String(mesId);
        });

        await chat.save();

        const resultChat = await Chat.findById(chatId).populate("speakerFirst speakerSecond messages");

        res.status(201)
            .json(resultChat);

    } catch(ex) {
        return next(ex);
    }

});

/* Uploading images */
router.post('/messages/upload/:id', [middleAuth, parser.single('picture')], async (req, res, next) => {

    const { _id } = req.user;
    const { id } = req.params;
    const content = req.file.secure_url;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Specified chat id is not valid' });
        return;
    }

    try {

        const chat = await Chat.findById(id);
        const newMessage = new Message({
            user: _id,
            content
        });

        const mesResult = await newMessage.save();

        chat.messages = [mesResult._id, ...chat.messages];
        await chat.save();

        const userSecondId = String(chat.speakerFirst !== String(_id)) ? chat.speakerSecond : chat.speakerFirst;
        const userSecond = await User.findById(userSecondId).select("chats");
        const userSecondHasChat = userSecond.chats.filter(ch => String(ch) === String(id)).length > 0;

        if(!userSecondHasChat) {
            userSecond.chats = [id, ...userSecond.chats];
            await userSecond.save();
        }
        const chatResult = await Chat.findById(id).populate("speakerFirst speakerSecond messages");

        res.status(201)
            .json(chatResult);

    } catch(ex) {
        return next(ex);
    }
});

module.exports = router;