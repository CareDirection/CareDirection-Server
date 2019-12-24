const token = require('../lib/token')
// const _ = require('lodash')
// const { secretKey } = require('../configAll')
const secretKey = '123123123'

const { respondJson, respondOnError } = require('../lib/response')

module.exports = async (req, res, next) => {
  const { usertoken } = req.headers

  try {
    req.user = await token.decode(usertoken, secretKey)

    if (_.isEmpty(req.user)) {
      throw new Error('user Authentication Error')
    }
    next()
  } catch (e) {
    respondOnError(e.message, res, 401)
  }
}
