const Joi = require('@hapi/joi')
const searchService = require('../service/searchService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.searchTotalList = async (req, res) => {
  const { query, filter } = req.query
  const { limit } = req.query || 0

  const schema = Joi.object({
    query: Joi.string().required(),
    filter: Joi.string().required(),
  })

  const validationData = { query, filter }
  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    const result = await searchService.searchTotalList(req)
    response.respondJson(message.SEARCH_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    if (e.message === message.SEARCH_DATA_EMPTY) {
      response.respondOnError(message.SEARCH_DATA_EMPTY, res, statusCode.NO_CONTENT)
    }
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.searchDoseProduct = async (req, res) => {
  try {
    const searchResult = await searchService.searchDoseProduct(req)
    response.respondJson(message.SEARCH_SUCCESS, searchResult, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
