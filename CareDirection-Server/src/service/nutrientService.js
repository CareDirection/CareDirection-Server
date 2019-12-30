// const db = require('../lib/dbConnection')

const { Transaction, getConnection } = require('../lib/dbConnection')
const nutrientDao = require('../dao/nutrientDao')

// const connection = db.getConnection()
// const transaction = db.Transaction

const insertNutrient = async (req) => {
  const connection = await getConnection()
  try {
    nutrientDao.insertNutrient(connection, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}

const getParentMyFunctioinalNutrients = async (req, next) => {
  try {
    const result = await nutrientDao.getParentMyFunctioinalNutrients(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
  }
}

const getChildMyFunctioinalNutrients = async (req, next) => {
  try {
    const result = await nutrientDao.getChildMyFunctioinalNutrients(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = {
  insertNutrient,
  getParentMyFunctioinalNutrients,
  getChildMyFunctioinalNutrients,
}
