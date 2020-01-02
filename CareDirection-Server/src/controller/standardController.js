const Joi = require('@hapi/joi')
const standardService = require('../service/standardSercive')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.getStandardFilterCategories = async (req, res) => {
  const validationChecker = Joi.object({
    product_idx: Joi.number().integer().required(),
  })
  try {
    await validationChecker.validateAsync(req.query)
  } catch (e) {
    response.respondOnError(message.NULL_VALUE, res, statusCode.BAD_REQUEST)
    return
  }
  try {
    const filterCategories = await standardService.getStandardFilterCategories(req)
    response.respondJson(message.SELECT_SUCCESS, filterCategories, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
