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
      throw new Error(403)
    }

    await efficacyService.insertEfficacy(req)
    response.respondJsonWithoutData(message.EFFICACY_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.INSERT_FAILED, res, statusCode.FORBIDDEN)
  }
}

const getEfficacyList = async (req, res) => {
  try {
    const efficacyList = await efficacyService.getEfficacyList()
    response.respondJson(message.EFFICACY_SELECTED, efficacyList, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.DB_ERROR, res, statusCode.DB_ERROR)
  }
}

const getNutrientsListPerEfficacy = async (req, res) => {
  const validationChecker = Joi.object({
    efficacy_idx: Joi.number().integer().required(),
  })

  try {
    const validationResult = await validationChecker.validateAsync(req.params)
    if (validationResult.error) {
      throw new Error(403)
    }

    const nutrientList = await efficacyService.getNutrientsListPerEfficacy(req)
    response.respondJson(message.SELECT_SUCCESS, nutrientList, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(e.message, res, statusCode.DB_ERROR)
  }
}

const getMyEfficacyList = async (req, res) => {
  try {
    const efficacyList = await efficacyService.getMyEfficacyList(req)
    console.log('efficacyList', efficacyList)
    response.respondJson(message.EFFICACY_SELECTED, efficacyList, res, statusCode.OK)
  } catch (e) {
    console.log(e.message)
    response.respondOnError(message.DB_ERROR, res, statusCode.DB_ERROR)
  }
}

module.exports = {
  insertEfficacy,
  getEfficacyList,
  getNutrientsListPerEfficacy,
  getMyEfficacyList,
}
