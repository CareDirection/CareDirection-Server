const { Transaction, getConnection } = require('../lib/dbConnection')
const nutrientDao = require('../dao/nutrientDao')
const getSignedUrl = require('../lib/signedurl')

exports.insertNutrient = async (next, req) => {
  try {
    await nutrientDao.insertNutrient(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
  }
}

exports.getParentMyFunctioinalNutrients = async (req, next) => {
  try {
    const result = await nutrientDao.getParentMyFunctioinalNutrients(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
  }
}

exports.getChildMyFunctioinalNutrients = async (req, next) => {
  try {
    const result = await nutrientDao.getChildMyFunctioinalNutrients(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
  }
}

exports.specificInfo = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await nutrientDao.specificInfo(connection, req, next)
    result[0].image_key = await getSignedUrl.getSignedUrl(result[0].image_key)
    console.log(result)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
