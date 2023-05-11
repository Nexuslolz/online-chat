const Router = require('koa-router')
const passport = require('koa-passport')

const Post = require('../models/Post')

const router = new Router().prefix('/posts/:postId/likes')

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const post = await Post.findById(ctx.params.postId)

  if (!post) {
    ctx.throw(404, 'Пост не найден')
  }

  const user = ctx.state.user._id


  if (post.likes.find((l) => l.user.toString() === user.toString())) {
    ctx.throw(400, `${user}`)
  }
  post.likes.unshift({ user })
  await post.save()

  ctx.body = user
})

router.delete('/:likeId', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const post = await Post.findById(ctx.params.postId)

  if (!post) {
    ctx.throw(404, 'Пост не найден')
  }

  const likeIndex = post.likes.findIndex((l) => l._id.toString() === ctx.params.likeId)

  if (likeIndex < 0) {
    ctx.throw(404, 'Лайк не найден')
  }
  post.likes.splice(likeIndex, 1)
  ctx.body = await post.save()
})

module.exports = router.routes()
