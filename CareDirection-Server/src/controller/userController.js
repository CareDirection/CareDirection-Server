const Joi = require('@hapi/joi')
const userService = require('../service/userService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')
//controller는 응답관련 처리!

exports.signUp = async (req, res) => {
  const { user_email, user_pw } = req.body

  // email -> 이메일형식,string  password -> string
  const schema = Joi.object({
    user_email: Joi.string().email().required(),
    user_pw: Joi.string().required(),
  })

  const validationData = { user_email, user_pw }

  try {
    // 입력 값의 유효성 확인 (not null, 유효한 형태)

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
