const mongoose = require('mongoose')
const Schema = mongoose.Schema
const privatePaths = require('mongoose-private-paths')
const newPost = require('./Post')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    about: {
      type: String,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
    hobby: {
      type: String,
      required: false,
    }
  },
  posts: [{
    body: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    username: {
      type: String,
      required: true
    },
    likes: [{
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
      },
      createdDate: {
        type: Date,
        default: Date.now
      },
    }],
    createdDate: {
      type: Date,
      default: Date.now
    },
  }],
  password: {
    type: String,
    required: true,
    private: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

userSchema.plugin(privatePaths)

module.exports = mongoose.model('users', userSchema)
