const { Transaction, getConnection } = require('../lib/dbConnection')
const productDao = require('../dao/productDao')

exports.dose = async (req, next) => {
  //const connection = await getConnection()
  try {
    const result = await productDao.dose(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    //connection.release()

  }
}
