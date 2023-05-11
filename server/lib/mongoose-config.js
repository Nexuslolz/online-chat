const mongoose = require('mongoose')

const config = require('./config')

module.exports = () => {
  mongoose
    .connect(config.mongoUri, { useNewUrlParser: true })
    .then(() => console.log('mongo connected'))
    .catch((err) => console.log(err))
}
