const { Transaction, getConnection } = require('../lib/dbConnection')
const productDao = require('../dao/productDao')
const moment = require('moment')

exports.dose = async (req, next) => {
  // const connection = await getConnection()
  try {
    const result = await productDao.dose(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    // connection.release()

  }
}

// 제품 등록 service
exports.insertProduct = async (next, data) => {
  try {
    await productDao.insertProduct(Transaction, data, next)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.checkProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    console.log(currentTime)
    const result = await productDao.checkProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
