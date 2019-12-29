const _ = require('lodash')
const jwt = require('../lib/token')
const secretKey = require('../../config/jwt.secretKey')

// eslint-disable-next-line no-unused-vars
const { respondJson, respondOnError } = require('../lib/response')

module.exports = async (req, res, next) => {
  const { token } = req.headers

  try {
    req.user = await jwt.decode(token, secretKey.development)
    if (_.isEmpty(req.user)) {
      throw new Error('user Authentication Error')
    }
    next()
  } catch (e) {
    respondOnError(e.message, res, 401)
  }
}
