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

// 제품 등록 service
exports.insertProduct = async (next, data) => {
  try {
    await productDao.insertProduct(Transaction, data, next)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
