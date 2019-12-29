const Joi = require('@hapi/joi')
const nutrientService = require('../service/nutrientService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

const insertNutrient = async (req, res) => {
  const validationChecker = Joi.object({
    nutrient_type: Joi.number().integer().required(),
    nutrient_name: Joi.string().required(),
    nutrient_recommend_dose: Joi.number().integer(),
    nutrient_max_dose: Joi.number().integer(),
    nutrient_dose_unit: Joi.string(),
    nutrient_common_description: Joi.string(),
    nutrient_default_description: Joi.string(),
  })

  try {
    const validationResult = await validationChecker.validateAsync(req.body)
    if (validationResult.error) {
      throw new Error(403)
    }

    await nutrientService.insertNutrient(req)
    response.respondJsonWithoutData(message.NUTRIENT_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.FORBIDDEN)
  }
}

module.exports = {
  insertNutrient,
}
