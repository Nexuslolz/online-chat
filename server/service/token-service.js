const jwt = require('jsonwebtoken')
const config = require('../lib/config')
const TokenSchema = require('../models/Token')

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, config.secret, { expiresIn: '24h' })
    const refreshToken = jwt.sign(payload, config.secretRefrech, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenSchema.findOne({ user: userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await TokenSchema.create({ user: userId, refreshToken })
    return token
  }

  async removeToken(refreshToken) {
    const token = await TokenSchema.deleteOne({ refreshToken })
    return token
  }

  async findToken(refreshToken) {
    const token = await TokenSchema.findOne({ refreshToken })
    return token
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.secret)
      return userData
    } catch (err) {
      return null
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_REFRESH)
      return userData
    } catch (err) {
      return null
    }
  }
}

module.exports = new TokenService()
