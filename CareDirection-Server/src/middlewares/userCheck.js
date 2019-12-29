const token = require('../lib/token')
// const _ = require('lodash')
// const { secretKey } = require('../configAll')
const secretKey = require('../../config/jwt.secretKey')

const { respondJson, respondOnError } = require('../lib/response')

module.exports = async (req, res, next) => {
  const { usertoken } = req.headers
  console.log(usertoken)
  try {
    req.user = await token.decode(usertoken, secretKey.development)
    const user_idx = req.user.user_idx  //token 해독해서 user_idx 받아오기
    if (_.isEmpty(req.user)) {
      throw new Error('user Authentication Error')
    }
    next()
  } catch (e) {
    respondOnError(e.message, res, 401)
  }
}
