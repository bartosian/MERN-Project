const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Joi = require('joi');

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
  status: String,
  contacts: [String],
  interests: [String],
  dob: String,
  friends : [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
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
