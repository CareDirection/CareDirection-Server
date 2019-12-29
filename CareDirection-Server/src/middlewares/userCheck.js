const _ = require('lodash')
const jwt = require('../lib/token')
const secretKey = require('../../config/jwt.secretKey')
const statusCode = require('../lib/statusCode')
const message = require('../lib/responseMessage')

const { respondJson, respondOnError } = require('../lib/response')


module.exports = async (req, res, next) => {
  const { token } = req.headers
  try {
    req.user = await jwt.decode(token, secretKey.development)
    if (_.isEmpty(req.user)) {
      respondOnError(message.INVALID_TOKEN, res, statusCode.UNAUTHORIZED)
      return
    }
    next()
  } catch (e) {
    respondOnError(message.INVALID_TOKEN, res, statusCode.UNAUTHORIZED)
  }
}
