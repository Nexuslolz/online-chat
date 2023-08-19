const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('subscriptions', SubscriptionSchema)
