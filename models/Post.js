const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Joi = require('joi');

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    content: {
        type: String,
        required: true,
        minLength: 1
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Post = mongoose.model('Post', postSchema);

function validatePost(postData) {
    const post = {
        content: Joi.string().min(1).required()
    };

    let result = Joi.validate(postData, post);
    let { error } =  result;

    return error;
}

module.exports = {
    Post,
    validatePost,
    postSchema
};