const Mysql = require('promise-mysql')
const dbpool = require('../../config/dbPool')


const pool = Mysql.createPool(dbpool)

module.exports = {
  getConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
          console.log(err)
        } else {
          resolve(connection)
        }
      })
    })
  },
  Transaction: async (...args) => {
    console.log('Transaction start')
    const connection = await pool.getConnection()

    console.log('Transaction : beginTransaction')
    await connection.beginTransaction()

    console.log('Transaction : result')
    const result = await args[0](connection).catch(async (err) => {
      console.log('Transaction : rollback')
      await connection.rollback()
      console.log('Transaction : releaseConnection')
      pool.releaseConnection(connection)
      // throw err
      console.log(err)
    })

    console.log('Transaction : commit')
    await connection.commit()

    console.log('Transaction : releaseCOnnection')
    pool.releaseConnection(connection)

    console.log('Transaction : return')
    return result
  },
}
