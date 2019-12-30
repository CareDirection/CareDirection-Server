const { Transaction, getConnection } = require('../lib/dbConnection')
const surveyDao = require('../dao/surveyDao')

// eslint-disable-next-line consistent-return
exports.lifecycle = async (data, req) => {
  const connection = await getConnection()

  try {
    if (req.user.type === 'parent') {
      await surveyDao.lifecycle(connection, req, data)
    } else {
      await surveyDao.lifecycleChild(connection, req, data)
    }
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
