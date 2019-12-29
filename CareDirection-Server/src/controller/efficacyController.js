// const joi = require('@hapi/joi')
const efficacyService = require('../service/efficacyService')
const { respondJsonWithoutData, respondOnError } = require('../lib/response')

const insertEfficacy = async (req, res) => {
  try {
    await efficacyService.insertNutrient(req)
    respondJsonWithoutData('효능 인서트 성공', res, 201)
  } catch (e) {
    console.log(e.message)
    respondOnError('인서트실패', res, 400)
  }
}

module.exports = {
  insertEfficacy,
}
