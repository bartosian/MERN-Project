const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Joi = require('joi');
const { postSchema } = require('./Post');
const { chatSchema } = require('./Chat');

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  image: String,
  status: {
      type: String,
      enum: ['Single', 'Married', 'Have a friend']
  },
  contacts: {
      email: String,
      linkedIn: String,
      instagram: String,
      facebook: String
  },
  interests: [String],
  dob: Date,
  friends : [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  posts: [postSchema],
  chats: [chatSchema]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(userData) {
    const user = {
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    };

    let result = Joi.validate(userData, user);
    let { error } =  result;

    return error;
}

module.exports = {
  User,
  validateUser
};
