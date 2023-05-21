const Router = require('koa-router')
const passport = require('koa-passport')
const User = require('../models/User')

const Subscription = require('../models/Subscription')

const router = new Router().prefix('/subscriptions')

router.put('/add-friend', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const { friend } = ctx.request.body
  const subscriber = ctx.state.user._id

  const newFriend = await User.findById(friend)
  const owner = await User.findById(subscriber)


  const user = await User.findByIdAndUpdate(
    subscriber,
    { friends: [...owner.friends, friend] },
    { new: true }
  )

  const subscribe = await User.findByIdAndUpdate(
    friend,
    { friends: [...newFriend.friends, subscriber] },
    { new: true }
  )

  ctx.body = { me: user, fr: subscribe }

  ctx.status = 201
})

router.get('/all', async (ctx) => {
  const { query } = ctx
  const { skip, limit } = query
  delete query.skip
  delete query.limit

  const q = 'users' in query ?
    { user: { $in: query.users.split(',') } } : query
  ctx.set('x-total-count', await User.count(q))
  ctx.body = await User
    .find(q)
    .sort({ createdDate: - 1 })
    .skip(+skip)
    .limit(+limit)
})

router.put('/delete-friend', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const { friend, subscriber } = ctx.request.body

  const deleteFriend = await User.findById(friend)
  const owner = await User.findById(subscriber)

  const resultFriend = deleteFriend.friends.filter((item) => item !== subscriber)
  const resultOwn = owner.friends.filter((item) => item !== friend)


  await User.findByIdAndUpdate(
    subscriber,
    { friends: resultOwn },
    { new: true }
  )

  await User.findByIdAndUpdate(
    friend,
    { friends: resultFriend },
    { new: true }
  )

  ctx.body = { resultFriend, resultOwn }
  ctx.status = 201
})

module.exports = router.routes()
