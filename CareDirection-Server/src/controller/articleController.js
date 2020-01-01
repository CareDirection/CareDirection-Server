const Joi = require('@hapi/joi')
const articleService = require('../service/articleService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.insertArticle = async (req, res) => {
  const validationChecker = Joi.object({
    efficacy_name: Joi.string().required(),
  })

  try {
    const validationResult = await validationChecker.validateAsync(req.body)
    if (validationResult.error) {
      throw new Error(403)
    }

    await articleService.insertEfficacy(req)
    response.respondJsonWithoutData(message.EFFICACY_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.FORBIDDEN)
  }
}
