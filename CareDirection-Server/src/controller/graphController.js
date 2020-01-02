const graphService = require('../service/graphService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.getMyGraphInfo = async (req, res, next) => {
  try {
    const result = await graphService.getMyGraphInfo(req, next)
    response.respondJson(message.SELECT_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.getMyGraphDetailInfo = async (req, res, next) => {
  try {
    const result = await graphService.getMyGraphDetailInfo(req, next)
    response.respondJson(message.SELECT_SUCCESS, result, res, statusCode.OK)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
