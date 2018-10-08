const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const { Message } = require('./Message');

const chatSchema = new Schema({
    speakerFirst: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    speakerSecond: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Chat = mongoose.model('Chat', chatSchema);


module.exports = {
    Chat,
    chatSchema
};