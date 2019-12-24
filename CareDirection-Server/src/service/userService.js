const { Transaction, getConnection } = require('../lib/dbConnection')
const userDao = require('../dao/userDao')

exports.signUp = async (next) => {
    // const connection = await getConnection()

    try {
        const result = await userDao.singUp(Transaction,next)
        return result
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
    }
}
