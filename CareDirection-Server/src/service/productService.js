const { Transaction, getConnection } = require('../lib/dbConnection')
const productDao = require('../dao/productDao')

exports.dose = async (next) => {
  const connection = await getConnection()

  try {
    const result = await productDao.dose(next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
