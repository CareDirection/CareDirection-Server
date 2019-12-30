const Joi = require('@hapi/joi')
const surveyService = require('../service/surveyService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.lifecycle = async (req, res) => {
  const {
    user_survey_item_value1, user_survey_item_value2, user_survey_item_value3, user_survey_item_value4,
    user_survey_item_value5, user_survey_item_value6, user_survey_item_value7, 
  } = req.body

  const schema = Joi.object({
    user_survey_item_value1: Joi.string().required(),
    user_survey_item_value2: Joi.string().required(),
    user_survey_item_value3: Joi.string().required(),
    user_survey_item_value4: Joi.string().required(),
    user_survey_item_value5: Joi.string().required(),
    user_survey_item_value6: Joi.string().required(),
    user_survey_item_value7: Joi.string().required(),
  })

  const validationData = {
    user_survey_item_value1,
    user_survey_item_value2,
    user_survey_item_value3,
    user_survey_item_value4,
    user_survey_item_value5,
    user_survey_item_value6,
    user_survey_item_value7, 
  }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    await surveyService.lifecycle(validationData, req)
    response.respondJsonWithoutData(message.SURVEY_LIFECYCLE_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
