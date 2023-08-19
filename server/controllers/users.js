const Router = require('koa-router')
const passport = require('koa-passport')
const User = require('../models/User')
const Post = require('../models/Post')

const router = new Router().prefix('/users')

router.get('/:_id', async (ctx) => {
  const { _id } = ctx.params
  const user = await User.findById(_id)

  if (user) {
    ctx.body = user
  } else {
    ctx.throw(404, 'Пользователь не найден')
  }
})

router.put('/edit-user', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const { id, body } = ctx.request.body

  ctx.body = await User.findByIdAndUpdate(
    id,
    { body: body },
    { new: true }
  )
})

router.put('/add-post', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const { body } = ctx.request.body
  const { user } = ctx.state
  const id = user._id

  const newPost = new Post({ body: body.content, image: 'body.image', user: user._id, username: user.name })
  ctx.body = newPost
  ctx.body = await User.findByIdAndUpdate(
    id,
    { posts: [...user.posts, newPost] },
    { new: true }
  )
  ctx.status = 201

})

router.get('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  ctx.body = ctx.state.user.posts
})

module.exports = router.routes()
