const { getConnection } = require('../lib/dbConnection')
const efficacyDao = require('../dao/efficacyDao')

const insertEfficacy = async (req) => {
  const connection = await getConnection()
  try {
    efficacyDao.insertEfficacy(connection, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}

module.exports = {
  insertEfficacy,
}
