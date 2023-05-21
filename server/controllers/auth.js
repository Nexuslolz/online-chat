const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const config = require('../lib/config')
const tokenService = require('../service/token-service')

const router = new Router().prefix('/auth')

router.post('/register', async (ctx) => {
  const { name, email, password } = ctx.request.body
  const user = await User.findOne({ email })
  if (user) {
    ctx.throw(400, 'E-mail уже занят')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name, email, password: hash, body: {
      about: '',
      age: '',
      city: ''
    },
    friends: [],
    posts: []
  })

  const payload = {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    body: newUser.body,
    posts: newUser.posts,
    friends: newUser.friends
  }

  const tokens = tokenService.generateToken(payload)
  await tokenService.saveToken(payload.id, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { httpOnly: true, secure: false })
  ctx.status = 201
  ctx.body = { action: 'Registration success', ...tokens, user: payload }
})

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body
  const user = await User.findOne({ email })
  if (!user) {
    ctx.throw(400, 'Пользователя с этим e-mail не существует')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    ctx.throw(400, 'Некорректный пароль')
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    body: user.body,
    posts: user.posts,
    friends: user.friends
  }

  const tokens = tokenService.generateToken(payload)
  await tokenService.saveToken(payload.id, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { httpOnly: true, secure: false })
  ctx.body = { action: 'Login success', ...tokens, user: payload, cookie: ctx.cookie }
})

router.post('/logout', async (ctx) => {
  const refreshToken = ctx.cookies.get('refreshToken')
  await tokenService.removeToken(refreshToken)

  ctx.cookies.set('refreshToken', '', { httpOnly: true, secure: false })
  ctx.status = 200
})

router.get('/refresh', async (ctx) => {
  const refreshToken = ctx.cookies.get('refreshToken')

  if (!refreshToken) {
    ctx.throw(401, 'Пользователь не авторизован')
  }

  const userData = tokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = tokenService.findToken(refreshToken)

  if (!userData) {
    ctx.throw(401, `userdata + ${refreshToken} `)
  }

  if (!tokenFromDb) {
    ctx.throw(401, `tokendb + ${refreshToken} `)
  }

  const user = await User.findById(userData.id)

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    body: user.body,
    posts: user.posts,
    friends: user.friends
  }

  const tokens = tokenService.generateToken(payload)
  await tokenService.saveToken(payload.id, tokens.refreshToken)

  ctx.cookies.set('refreshToken', tokens.refreshToken, { httpOnly: true, secure: false })
  ctx.body = { action: 'Refresh success', ...tokens, user: payload, cookie: ctx.cookie }
})

module.exports = router.routes()
