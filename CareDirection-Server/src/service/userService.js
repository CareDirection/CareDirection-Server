const crypto = require('crypto')
const { Transaction, getConnection } = require('../lib/dbConnection')
const userDao = require('../dao/userDao')

// eslint-disable-next-line consistent-return
exports.signUp = async (data) => {
  const connection = await getConnection()

  data.user_salt = Math.round((new Date().valueOf() * Math.random()))
  data.user_pw = crypto.createHash("sha512").update(data.user_pw + data.user_salt).digest("hex")

  try {
    await userDao.signUp(connection, data)
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
