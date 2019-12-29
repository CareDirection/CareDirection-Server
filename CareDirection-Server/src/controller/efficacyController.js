const Joi = require('@hapi/joi')
const efficacyService = require('../service/efficacyService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

const insertEfficacy = async (req, res) => {
  const validationChecker = Joi.object({
    efficacy_name: Joi.string().required(),
  })

  try {
    const validationResult = await validationChecker.validateAsync(req.body)
    if (validationResult.error) {
      throw new Error(400)
    }

    await efficacyService.insertEfficacy(req)
    response.respondJsonWithoutData(message.EFFICACY_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.BAD_REQUEST)
  }
}

module.exports = {
  insertEfficacy,
}
