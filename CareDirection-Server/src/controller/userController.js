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

exports.userList = async (req, res, next) => {
  try {
    const result = await userService.userList(req, next)
    response.respondJson(message.USER_LIST_GET_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(e.message, res, 500)
  }
}

exports.duplicateId = async (req, res) => {
  const { user_id } = req.body

  const schema = Joi.object({
    user_id: Joi.string().required(),
  })

  const validationData = { user_id }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }

    const result = await userService.duplicateId(validationData)

    if (result) {
      // false : 중복 -> 이용 불가능, true : 이용가능
      console.log('test1', result)
      response.respondJsonWithoutData(message.VALID_ID, res, statusCode.CREATED)
    }
    response.respondJsonWithoutData(message.INVALID_ID, res, statusCode.DUPLICATED)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.modifyName = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { user_name } = req.body
  const { token } = req.headers

  const schema = Joi.object({
    user_name: Joi.string().required(),
    token: Joi.string().required(),
  })

  const validationData = { user_name, token }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.MODIFY_FAILED, res, statusCode.FORBIDDEN)
    }
    await userService.modifyName(validationData)
    response.respondJsonWithoutData(message.MODIFY_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)

  }
}

exports.removeMyChild = async (req, res) => {
  try {
    await userService.removeMyChild(req)
    response.respondJsonWithoutData(message.REMOVE_CHILD_USER_SUCCESS, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(e.message, res, 500)
  }
}

exports.surveyInfo = async (req, res) => {
  const { user_name, user_gender, user_birth } = req.body

  const schema = Joi.object({
    user_name: Joi.string().required(),
    user_gender: Joi.number().required(),
    user_birth: Joi.string().required(),
  })

  const validationData = { user_name, user_gender, user_birth }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.SURVEY_INFO_FAILED, res, statusCode.FORBIDDEN)
    }
    await userService.surveyInfo(validationData, req)
    response.respondJsonWithoutData(message.SURVEY_INFO_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
