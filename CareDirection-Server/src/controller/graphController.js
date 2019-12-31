const graphService = require('../service/graphService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.getMyGraphInfo = async (req, res, next) => {
  try {
    const result = await graphService.getMyGraphInfo(req, next)
    response.respondJsonWithoutData(message.SELECT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
