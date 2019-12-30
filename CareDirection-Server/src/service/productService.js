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

exports.modifyDose = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await productDao.modifyDose(connection, req, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
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

exports.getProductStandard = async (req) => {
  const connection = await getConnection()
  const { product_idx } = req.params
  try {
    const data = await productDao.getProductStandard(connection, product_idx)
    console.log(data)
    return [
      {
        standard: data.product_standard1,
        standard_value: data.product_standard1_value,
        standard_description: data.product_standard1_description,
      },
      {
        standard: data.product_standard2,
        standard_value: data.product_standard2_value,
        standard_description: data.product_standard2_description,
      },
      {
        standard: data.product_standard3,
        standard_value: data.product_standard3_value,
        standard_description: data.product_standard3_description,
      },
    ]
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.deleteDoseProduct = async (req) => {
  const connection = await getConnection()
  try {
    if (req.user.type = 'parent') {
      await productDao.deleteParentUserDoseProduct(connection, req)
    } else {
      await productDao.deleteChildUserDoseProduct(connection, req)
    }
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
