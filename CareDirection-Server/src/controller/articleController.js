const Joi = require('@hapi/joi')
const articleService = require('../service/articleService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.insertMainArticle = async (req, res, next) => {
  try {
    await articleService.insertMainArticle(req, next)
    response.respondJsonWithoutData(message.SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.FORBIDDEN)
  }
}

exports.insertSubArticle = async (req, res, next) => {
  try {
    await articleService.insertSubArticle(req, next)
    response.respondJsonWithoutData(message.SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.FORBIDDEN)
  }
}

exports.getArticleList = async (req, res) => {
  try {
    const result = await articleService.getArticleList()
    response.respondJson(message.ARTICLE_DATA_LIST, result, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.FORBIDDEN)
  }
}

exports.getArticle = async (req, res) => {
  const validationChecker = Joi.object({
    article_idx: Joi.number().integer().required(),
  })
  try {
    await validationChecker.validateAsync(req.params)
  } catch (e) {
    response.respondOnError(message.VALUE_MUST_INTEGER, res, statusCode.BAD_REQUEST)
    return
  }
  try {
    const result = await articleService.getArticle(req)
    response.respondJson(message.ARTICLE_DATA_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.FORBIDDEN)
  }
}
