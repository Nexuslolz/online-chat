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
    age: {
      type: String,
      required: false,
    },
    city: {
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
    image: {
      type: Buffer,
      required: false,
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
  friends: [{
    type: String,
    required: false
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
