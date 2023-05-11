const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
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
    required: true,
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
})

module.exports = mongoose.model('posts', postSchema)
