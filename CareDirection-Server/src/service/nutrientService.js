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

module.exports = {
  insertNutrient,
}
