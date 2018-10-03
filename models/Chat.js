const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatSchema = new Schema({
    speakerFirst: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    speakerSecond: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [messageSchema]
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