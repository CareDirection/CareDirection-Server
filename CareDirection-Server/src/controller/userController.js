const Joi = require('@hapi/joi')
const userService = require('../service/userService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.signUp = async (req, res) => {
  const { user_id, user_pw } = req.body

  const schema = Joi.object({
    user_id: Joi.string().required(),
    user_pw: Joi.string().required(),
  })

  const validationData = { user_id, user_pw }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }

    await userService.signUp(validationData)
    response.respondJsonWithoutData(message.SIGN_UP_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.signIn = async (req, res) => {
  const { user_id, user_pw } = req.body

  const schema = Joi.object({
    user_id: Joi.string().required(),
    user_pw: Joi.string().required(),
  })

  const validationData = { user_id, user_pw }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }

    const result = await userService.signIn(validationData)
    console.log('test0', result)

    if (result != null) {
      return response.respondJson(message.SIGN_IN_SUCCESS, { token: result }, res, statusCode.OK)
    }
    return response.respondJsonWithoutData(message.SIGN_IN_PASSWORD_ERROR, res, statusCode.FORBIDDEN)

  } catch (e) {
    return response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
