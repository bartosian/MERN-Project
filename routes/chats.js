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


module.exports = router;