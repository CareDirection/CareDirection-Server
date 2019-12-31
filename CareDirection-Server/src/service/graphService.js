const { Transaction, getConnection } = require('../lib/dbConnection')
const graphDao = require('../dao/graphDao')

exports.getMyGraphInfo = async (req, next) => {
  try {
    const result = graphDao.getMyGraphInfo(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
  }
}
