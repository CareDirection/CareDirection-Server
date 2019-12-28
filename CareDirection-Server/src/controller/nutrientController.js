// const joi = require('@hapi/joi')
const nutrientService = require('../service/nutrientService')
const { respondJsonWithoutData, respondOnError } = require('../lib/response')

const insertNutrient = async (req, res) => {
  try {
    await nutrientService.insertNutrient(req)
    respondJsonWithoutData('성분 인서트 성공', res, 201)
  } catch (e) {
    console.log(e.message)
    respondOnError('인서트실패', res, 400)
  }
}

module.exports = {
    insertNutrient,
}
