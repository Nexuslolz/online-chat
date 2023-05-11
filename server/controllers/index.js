const Router = require('koa-router')

const auth = require('./auth')
const posts = require('./posts')
const likes = require('./post-likes')
const users = require('./users')
const subscriptions = require('./subscriptions')

const router = new Router().prefix('/api')

router.use(auth, posts, likes, users, subscriptions)

module.exports = router
