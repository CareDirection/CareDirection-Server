const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const productDao = require('../dao/productDao')
const getSignedUrl = require('../lib/signedurl')

exports.importDose = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await productDao.importDose(connection, req, next)
    result[0].image_key = await getSignedUrl.getSignedResizedUrl(result[0].image_key)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
exports.enrollDose = async (req, next) => {
  try {
    const result = await productDao.enrollDose(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

// 제품 등록 service
exports.insertProduct = async (next, data) => {
  try {
    const price = data.product_quantity_price.split(',')
    const count = data.product_quantity_count.split(',')
    data.price = price
    data.count = count
    await productDao.insertProduct(Transaction, data, next)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.checkParentUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    console.log(currentTime)
    const result = await productDao.checkParentUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.checkChildUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    console.log(currentTime)
    const result = await productDao.checkChildUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.uncheckParentUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    const result = await productDao.uncheckParentUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.uncheckChildUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    const result = await productDao.uncheckChildUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
