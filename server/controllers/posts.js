const Router = require('koa-router')
const passport = require('koa-passport')
const Post = require('../models/Post')

const router = new Router().prefix('/posts')

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const { body } = ctx.request.body
  const { user } = ctx.state

  ctx.body = await new Post({ body: body.content, image: 'body.image', user: user._id, username: user.name }).save()
  ctx.body = ctx.request.body
  ctx.status = 201
}),

  router.get('/', async (ctx) => {
    const { query } = ctx
    const { skip, limit } = query
    delete query.skip
    delete query.limit

    const q = 'users' in query ?
      { user: { $in: query.users.split(',') } } : query
    ctx.set('x-total-count', await Post.count(q))
    ctx.body = await Post
      .find(q)
      .sort({ createdDate: - 1 })
      .skip(+skip)
      .limit(+limit)
  })

router.get('/:postId', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const post = await Post.findById(ctx.params.postId)

  if (!post) {
    ctx.throw(404, 'Пост не найден')
  }

  ctx.body = { likeList: post }
})


module.exports = router.routes()
